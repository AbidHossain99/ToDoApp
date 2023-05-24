const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(`MONGODB CONNECTED ${conn.connection.host}`);
  } catch (error) {
    console.error(`error ${error.message}`);
  }
};

module.exports = connectDB;
