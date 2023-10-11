const mongoose = require("mongoose");
const connectDatabase = () => {
  try {
    mongoose
      .connect(
        "mongodb+srv://harshitamishra912:taskmanager@cluster0.tqbgh6g.mongodb.net/?retryWrites=true&w=majority"
      )
      .then(() => {
        console.log("database connected");
      });
  } catch (error) {
    console.log(error);
  }
};
module.exports = { connectDatabase };
