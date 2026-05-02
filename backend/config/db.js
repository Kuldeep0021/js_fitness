const mongoose = require('mongoose');

const connectDB = async (retries = 5, backoffMs = 2000) => {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error('MONGO_URI is not defined');
  }

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const conn = await mongoose.connect(uri);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
      return conn;
    } catch (error) {
      console.error(`MongoDB connection attempt ${attempt} failed: ${error.message}`);
      if (attempt < retries) {
        const wait = backoffMs * attempt;
        console.log(`Retrying in ${wait}ms...`);
        await new Promise((r) => setTimeout(r, wait));
      } else {
        console.error('All MongoDB connection attempts failed.');
        throw error;
      }
    }
  }
};

module.exports = connectDB;
