const express = require("express");
const router = express.Router();

const {
  createTask,
  getMyTasks,
  updateTask,
  deleteTask
} = require("../controllers/task.controller");

router.post("/", createTask);
router.get("/", getMyTasks);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;