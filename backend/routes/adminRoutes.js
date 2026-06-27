const express = require("express");

const router = express.Router();

const {
  loginAdmin,
  getDashboardStats,
  getRecentApplications,
  getApplicationById,
  approveApplication,
  rejectApplication,
  getAllUsers
} = require("../controllers/adminController");

router.post(
  "/login",
  loginAdmin
);

router.get(
  "/dashboard",
  getDashboardStats
);

router.get(
  "/applications/recent",
  getRecentApplications
);

router.put(
  "/application/:id/approve",
  approveApplication
);

router.put(
  "/application/:id/reject",
  rejectApplication
);

router.get(
  "/users",
  getAllUsers
);

router.get(
    "/application/:id",
    getApplicationById
);

module.exports = router;