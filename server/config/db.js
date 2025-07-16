const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Use MONGO_URI from .env or fallback to local
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/BlackWhole');
    console.log("Mongodb connected successfully");
  } catch (err) {
    console.error("MongoDB connection failed");
    process.exit(1); // Exit the app if DB connection fails
  }
};

module.exports = connectDB;
