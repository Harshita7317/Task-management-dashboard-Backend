const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema(
  {
    taskname: {
      type: String,
    },
    taskdescription: {
      type: String,
    },
    taskduedate: {
      type: String,
    },
    taskStatus: {
      type: String,
      enum: ["TO-DO", "ON-GOING", "COMPLETED"],
    },
  },

  { timestamps: true }
);
const TASK_MODELS = mongoose.model("tasks", taskSchema);
module.exports = TASK_MODELS;
//When you use mongoose.model(),
// your model will use the default mongoose connection.
