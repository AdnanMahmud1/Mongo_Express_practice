import mongoose from "mongoose";

const HOST = process.env.MONGODB_HOST || "0.0.0.0";
console.log("process.env.MONGODB_HOST - ", HOST);

export const uri = `mongodb://${HOST}:27017/productfinder`;
//export const uri = "mongodb://localhost:27017/productfinder";
//export const uri = "mongodb://0.0.0.0:27017/productfinder";

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
