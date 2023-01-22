import mongoose from "mongoose";

export const uri = "mongodb://localhost:27017/productfinder";

const options = {
  autoIndex: false, // Don't build indexes
  maxPoolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4, // Use IPv4, skip trying IPv6
};

export const connectWithDb = () => {
  mongoose.set("strictQuery", true).connect(uri, options, (err, db) => {
    if (err) {
     throw err;
    }
    // else console.log("Connection established");
  });
};
