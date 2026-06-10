const Specialist = require("../models/Specialist");
const { passwordService, jwtService, auditService } = require("../../security/service");
const { AUDIT_EVENTS, AUDIT_LEVELS } = require("../../security/service/audit.service");

// Controller Registration

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

    const existingUser = await Specialist.findOne({
      email: email.toLowerCase()
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already registered"
      });
    }

    let hashedPassword;
    try {
      hashedPassword = await passwordService.hashPassword(password, {
        userInfo: { email, firstName, lastName }
      });
    } catch (error) {
      if (error.code === 'PASSWORD_VALIDATION_FAILED') {
        return res.status(400).json({ success: false, message: error.details.join(', ') });
      }
      console.error('Password hashing error:', error);
      return res.status(500).json({ success: false, message: "Failed to process password." });
    }


    const specialist =
      await Specialist.create({
        firstName,
        lastName,
        email: email.toLowerCase(),
        password: hashedPassword,
        hospital,
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

module.exports = {
  registerSpecialist
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
      role: specialist.role || 'Specialist', // Assuming 'Specialist' role, adjust if model has a role field
      isVerified: specialist.status === 'Approved' // Assuming 'Approved' status means verified
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
