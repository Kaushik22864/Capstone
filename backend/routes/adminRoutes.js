const express = require("express");

const router = express.Router();

const {
  loginAdmin,
  getDashboardStats,
  getRecentApplications,
  getApplicationById,
  approveApplication,
  rejectApplication,
  getAllUsers,
  getUserDetails
  ,updateUserRole
  ,deleteUser
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

router.get(
  "/user/:id",
  getUserDetails
);

router.put(
  "/user/:id/role",
  updateUserRole
);

router.delete(
  "/user/:id",
  deleteUser
);

module.exports = router;