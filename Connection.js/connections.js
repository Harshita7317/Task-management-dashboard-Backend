const mongoose = require("mongoose");
const connectDatabase = async () => {
  try {
    (await mongoose.connect("mongodb://127.0.0.1:27017")).then(() => {
      console.log("Database connected successfully");
    });
  } catch (error) {
    console.log(error);
  }
};
module.exports = { connectDatabase };
