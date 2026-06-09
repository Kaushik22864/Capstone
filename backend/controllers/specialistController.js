const Specialist = require("../models/Specialist");
const bcrypt = require("bcryptjs");

// Specialist Registration

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

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

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

// Specialist Login

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

    const passwordMatch =
      await bcrypt.compare(
        password,
        specialist.password
      );

    if (!passwordMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    const token = jwt.sign(
      {
        id: specialist._id,
        email: specialist.email
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d"
      }
    );

    res.status(200).json({
      success: true,
      token,
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

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  registerSpecialist,
  loginSpecialist
};

