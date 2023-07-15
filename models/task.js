const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  Taskname: String,
  TaskDescription: String,
  TaskdueDate: String,
  TaskStatus: String,
});
const taskmodel = mongoose.model("Taskidetails", taskSchema);
module.exports = taskmodel;
