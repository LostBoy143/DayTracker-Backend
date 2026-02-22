const Attendance = require("../models/attendance.model");

const markAttendance = async (req, res) => {
  try {
    const userId = req.user.userId;

    const today = new Date().toISOString().split("T")[0];

    const attendance = await Attendance.create({
      userId,
      date: today
    });

    return res.status(201).json({
      success: true,
      message: "Attendance marked successfully",
      data: attendance
    });

  } catch (error) {
    // Duplicate key error (already marked)
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Attendance already marked for today"
      });
    }

    console.error("Attendance error:", error);
    return res.status(500).json({
      success: false,
      message: "Error marking attendance"
    });
  }
};

const getMyAttendance = async (req, res) => {
  try {
    const userId = req.user.userId;

    const attendance = await Attendance.find({ userId })
      .sort({ date: -1 });

    return res.status(200).json({
      success: true,
      data: attendance
    });

  } catch (error) {
    console.error("Fetch attendance error:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching attendance"
    });
  }
};

module.exports = { markAttendance, getMyAttendance };