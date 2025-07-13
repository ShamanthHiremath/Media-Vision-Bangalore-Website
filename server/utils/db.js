const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "Media-Vision-Bengaluru" // Specify the database name
    });
    console.log('MongoDB connected to Media-Vision-Bengaluru database');
    
    // Test the connection
    await connection.connection.db.admin().ping();
    console.log('Database ping successful');
  }
  catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

module.exports = connectDB; 