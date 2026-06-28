const Specialist = require("../models/Specialist");
const SpecialistApplication = require("../models/SpecialistApplication");

const {
  passwordService,
  jwtService,
  auditService,
  encryptionService,
} = require("../../security/services");

const {
  AUDIT_EVENTS,
  AUDIT_LEVELS,
} = require("../../security/services/audit.service");

const jwt = require("jsonwebtoken");

// ============================
// Specialist Registration
// ============================

const registerSpecialist = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      hospital,
      specialization,
      experience,
    } = req.body;

    const emailLower = email.toLowerCase();

    // Check if email already exists in approved specialists
    const existingSpecialist = await Specialist.findOne({
      email: emailLower,
    });

    // Check if email already exists in pending applications
    const existingApplication = await SpecialistApplication.findOne({
      email: emailLower,
    });

    if (existingSpecialist || existingApplication) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

    // Password Security: Hashing & Policy Validation
    const hashedPassword = await passwordService.hashPassword(password, {
      userInfo: {
        email: emailLower,
        firstName,
        lastName,
      },
    });

    // Encrypt PII fields (AES-256)
    const encryptedData = encryptionService.encryptFields(
      {
        firstName,
        lastName,
        hospital,
      },
      ["firstName", "lastName", "hospital"]
    );

    // Save as a pending application
    const application = await SpecialistApplication.create({
      ...encryptedData,
      email: emailLower,
      password: hashedPassword,
      specialization,
      experience,
      status: "pending",
    });

    // Log application creation
    auditService.log({
      action: AUDIT_EVENTS.USER_CREATED,
      userId: application._id,
      ipAddress: req.ip,
      details: {
        email: application.email,
        role: "Specialist Application",
      },
    });

    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      application,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ============================
// Specialist Login
// ============================

const loginSpecialist = async (req, res) => {
  try {
    const { email, password } = req.body;

    const specialist = await Specialist.findOne({ email });

    if (!specialist) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const passwordMatch = await passwordService.verify(
      password,
      specialist.password
    );

    if (!passwordMatch) {
      auditService.logAuth({
        type: "failure",
        userId: specialist._id,
        email: specialist.email,
        ipAddress: req.ip,
        userAgent: req.get("User-Agent"),
        reason: "INVALID_CREDENTIALS",
      });

      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const { accessToken, refreshToken } = jwtService.generateTokenPair({
      userId: specialist._id,
      email: specialist.email,
      role: specialist.role,
      isVerified: specialist.status === "Approved",
    });

    auditService.logAuth({
      type: "success",
      userId: specialist._id,
      email: specialist.email,
      ipAddress: req.ip,
      userAgent: req.get("User-Agent"),
    });

    res.status(200).json({
      success: true,
      token: accessToken,
      accessToken,
      refreshToken,
      specialist: {
        id: specialist._id,
        firstName: specialist.firstName,
        lastName: specialist.lastName,
        email: specialist.email,
        specialization: specialist.specialization,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ============================
// Exports
// ============================

module.exports = {
  registerSpecialist,
  loginSpecialist,
};