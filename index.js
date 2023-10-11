const mongoose = require("mongoose");
const path = require("path");
const express = require("express");
const app = express();
const TASK_MODELS = require("./models/task");
const { connectDatabase } = require("./Connection/connections");

// const DB =
//   "mongodb+srv://harshitamishra912:<password>@cluster0.stqjurm.mongodb.net/?retryWrites=true&w=majority";
// mongoose
//   .connect(DB, {
//     useNewUrlParser: true,
//     userCreateIndex: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false,
//   })
//   .then(() => {
//     console.log("Connected successfully");
//   })
//   .catch((err) => console.log("No connection"));
app.use(express.json());
// to save task coming from frontend to database
app.post("/api/taskmanagement", async (req, res) => {
  try {
    const newobject = {
      taskname: req.body.taskname,
      taskdescription: req.body.taskdescription,
      taskduedate: req.body.taskduedate,
      taskStatus: req.body.taskStatus,
    };
    console.log(newobject);
    const saveTask = new TASK_MODELS(newobject);
    await saveTask.save();
    return res
      .status(200)
      .json({ success: true, message: "Task data saved successfully" });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});
//to get data from backend to frontend
//Read operation
app.get("/api/gettasks", async (req, res) => {
  try {
    const task = await TASK_MODELS.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      task: task,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});

//Delete operation
app.delete("/api/delete/:id", async (req, res) => {
  try {
    await TASK_MODELS.findByIdAndDelete(req.params.id);
    return res.json({ success: true });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
});

//update operation
app.post("/api/updatetask/:id", async (req, res) => {
  try {
    await TASK_MODELS.findByIdAndUpdate(req.params.id, {
      taskStatus: req.body.taskStatus,
    });
    return res.json({ success: true, message: "Task Updated successfully" });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
});

app.use(express.static("client/build"));
app.get("*", (req, res) => {
  res.sendFile(
    path.resolve(__dirname + "/client/build/index.html"),
    function (err) {
      if (err) {
        console.log(err);
      }
    }
  );
});
connectDatabase();
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  console.log("server is running at Port", PORT);
});
