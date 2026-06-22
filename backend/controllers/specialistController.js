const Specialist = require("../models/Specialist");
const { passwordService, jwtService, auditService, encryptionService } = require("../../security/services");
const { AUDIT_EVENTS, AUDIT_LEVELS } = require("../../security/services/audit.service");

// Specialist Registration

// Combined exports at the end of the file
const registerSpecialist = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      hospital,
      specialization,
      experience
    } = req.body;

    const emailLower = email.toLowerCase();
    const existingUser = await Specialist.findOne({ email: emailLower });

    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email already registered" });
    }

    // 1. Password Security: Hashing & Policy Validation
    // The service handles policy checks internally. Redundant try/catch is removed 
    // as the global securityErrorHandler will catch validation failures.
    const hashedPassword = await passwordService.hashPassword(password, {
      userInfo: { email: emailLower, firstName, lastName }
    });

    // 2. Data Security: Encrypt PII fields (AES-256) for HIPAA compliance
    const encryptedData = encryptionService.encryptFields(
      { firstName, lastName, hospital },
      ['firstName', 'lastName', 'hospital']
    );

    const specialist =
      await Specialist.create({
        ...encryptedData,
        email: emailLower,
        password: hashedPassword,
        specialization,
        experience
      });

    // Log user creation event
    auditService.log({
      action: AUDIT_EVENTS.USER_CREATED,
      userId: specialist._id,
      ipAddress: req.ip,
      details: { email: specialist.email, role: 'Specialist' }
    });
    res.status(201).json({
      success: true,
      message: "Registration successful",
      specialist
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};

// Controller Login

const jwt = require("jsonwebtoken");

const loginSpecialist = async (req, res) => {
  try {

    const { email, password } = req.body;

    const specialist = await Specialist.findOne({
      email
    });

    if (!specialist) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    const passwordMatch = await passwordService.verify(password, specialist.password);

    if (!passwordMatch) {
      // Log failed login attempt
      auditService.logAuth({
        type: 'failure',
        userId: specialist._id,
        email: specialist.email,
        ipAddress: req.ip,
        userAgent: req.get('User-Agent'),
        reason: 'INVALID_CREDENTIALS'
      });
      return res.status(400).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    // Generate token pair using the security service
    const { accessToken, refreshToken } = jwtService.generateTokenPair({
      userId: specialist._id,
      email: specialist.email,
      role: specialist.role,
      isVerified: specialist.status === 'Approved'
    });

    // Log successful login
    auditService.logAuth({
      type: 'success',
      userId: specialist._id,
      email: specialist.email,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    });

    res.status(200).json({
      success: true,
      token: accessToken,
      accessToken,
      refreshToken, // Refresh token should ideally be set in an HttpOnly cookie
      specialist: {
        id: specialist._id,
        firstName: specialist.firstName,
        lastName: specialist.lastName,
        email: specialist.email,
        specialization:
          specialist.specialization
      }
    });

  } catch (error) {

    console.error('Login error:', error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Combined exports
module.exports = {
  registerSpecialist,
  loginSpecialist
};
