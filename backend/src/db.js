const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    let uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/siteforge';
    
    // Check if we can connect to the local/provided URI
    try {
      const conn = await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 2000, // Short timeout to check if real DB exists
      });
      console.log(`[MongoDB] Connected successfully to host: ${conn.connection.host}`);
      return;
    } catch (err) {
      console.warn(`[MongoDB] Failed to connect to ${uri}. Falling back to In-Memory MongoDB...`);
    }

    // Fallback to In-Memory MongoDB Server for easy development
    const { MongoMemoryServer } = require('mongodb-memory-server');
    const mongoServer = await MongoMemoryServer.create();
    uri = mongoServer.getUri();
    
    const conn = await mongoose.connect(uri);
    console.log(`[MongoDB-Memory] Connected successfully to In-Memory host: ${conn.connection.host}`);
    
  } catch (error) {
    console.error(`[MongoDB] Critical connection error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
