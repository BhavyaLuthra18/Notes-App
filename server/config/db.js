const mongoose = require("mongoose");
mongoose.set("strictQuery", false); // removing some warning that you get in the terminal

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Database Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
