const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connect = await mongoose.connect("mongodb://localhost/recipe");

    console.log(`MongoDB Connected at ${connect}`);
  } catch (error) {
    console.log(error);
  }
};
module.exports = connectDB;
