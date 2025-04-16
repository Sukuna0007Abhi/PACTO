// config/Mngdb.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Connecting to MongoDB using the URI from your .env file
    await mongoose.connect(process.env.MONGO_URI); 


      // Using these options to avoid deprecation warnings 
      //NOt more needed for updated version of mongdb
    //   {useNewUrlParser: true, // Good setting to use the new URL parser
    //   useUnifiedTopology: true, // to use the newer, unified topology layer for managing connections.
    // });
    
    console.log('MongoDB connected...');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
// This function connects to MongoDB using Mongoose.