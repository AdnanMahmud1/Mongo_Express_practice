import express from "express";
import models from "./models/index.js";
import mongoose from "mongoose";

const port = 3000;
const app = express();

app.use(express.json());

const uri = "mongodb://localhost:27017/productfinder";

const options = {
  autoIndex: false, // Don't build indexes
  maxPoolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4, // Use IPv4, skip trying IPv6
};
const connectWithDb = () => {
  mongoose.set("strictQuery", true).connect(uri, options, (err, db) => {
    if (err) {
      console.error(err);
    } else console.log("Connection established");
  });
};
connectWithDb();

app.get("/", (req, res) => {
  res.send("hello");
});

app.post("/", (req, res) => {
  const body = req.body;
  const user = new models.User({
    username: body.username,
    createdAt: new Date(),
  });
  user
    .save()
    .then((savedUser) => {
      res.status(201).send(savedUser._id);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.listen(port, () => {
  console.log(port);
});
