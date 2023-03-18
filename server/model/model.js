const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  name: { type: String },
  description: { type: String },
  isFinished: Boolean,
  timeStamp: Date,
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
