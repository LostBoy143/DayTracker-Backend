const express = require("express");
const router = express.Router();

const {
  markAttendance,
  getMyAttendance
} = require("../controllers/attendance.controller");

router.post("/mark", markAttendance);
router.get("/me", getMyAttendance);

module.exports = router;