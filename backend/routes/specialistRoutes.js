const express = require("express");

const router = express.Router();

const {
  registerSpecialist,
  loginSpecialist
} = require("../controllers/specialistController");

router.post(
  "/register",
  registerSpecialist
);

router.post(
  "/login",
  loginSpecialist
);

module.exports = router;