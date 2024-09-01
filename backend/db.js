const mongoose = require("mongoose");

// Database Connection
const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI);
    console.log("Connected to database successfully");
  } catch (error) {
    console.log("Not connected", error);
  }
};

module.exports = connectToDb;
