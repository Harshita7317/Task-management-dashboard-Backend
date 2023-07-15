const express = require("express");

const app = express();
const { connectDatabase } = require("./Connection/connections");
const TASK_MODELS = require("./models/task");

app.use(express.json());

app.post("/api/taskmanagement", async (req, res) => {
  try {
    console.log(req.body);
    const obj = {
      Taskname: req.body.name,
      TaskDescription: req.body.description,
      TaskdueDate: req.body.duedate,
      TaskStatus: req.body.status,
    };
    console.log(obj);
    const taskinfo = await TASK_MODELS(obj);
    await taskinfo.save();
    return res
      .status(200)
      .json({ success: true, message: "Task info saved successfully" });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
});

app.get("/api/taskmanagement", async (req, res) => {
  try {
    const taskdetails = await TASK_MODELS.find();
    return res.status(200).json({ success: true, data: taskdetails });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
});

connectDatabase();
const PORT = 8000;
app.listen(PORT, async () => {
  console.log(`Server is running at Port ${PORT}`);
});
