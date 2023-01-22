import express from "express";
import configure from "./controllers";
import connectWithDb from "./mongo";
import { handleErrors } from "./middlewares/handleErrors";
import winston from "winston";
import expressWinston from "express-winston";
import "winston-daily-rotate-file"
// import winstonMongo from "winston-mongodb"
// import {ElasticsearchTransport} from "winston-elasticsearch";

const port = 3000;
const app = express();

app.use(express.json());

const processRequest = async (req, res, next) => {
  let correlationId = req.header["x-correlation-id"];
  if (!correlationId) {
    correlationId = Date.now().toString();
    req.header["x-correlation-id"] = correlationId;
  }
  res.set("x-correlation-id", correlationId);
  return next();
};

app.use(processRequest);

connectWithDb();

const getMessage = (req, res) => {
  let obj = {
    correlationId: req.header["x-correlation-id"],
    reqruestBody: req.body,
  };
  return JSON.stringify(obj);
};

const fileInfoTransport = new (winston.transports.DailyRotateFile)({
  filename: "log-info-%DATE%.log",
  datePattern: "yyyy-MM-DD-HH",
});

const fileErrorTransport = new (winston.transports.DailyRotateFile)({
  filename: "log-error-%DATE%.log",
  datePattern: "yyyy-MM-DD-HH",
});

const infoLogger = expressWinston.logger({
  transports: [new winston.transports.Console(), fileInfoTransport],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  ),
  meta: true,
  msg: getMessage,
});

const errorLogger = expressWinston.errorLogger({
  transports:[
    new winston.transports.Console(),
    fileErrorTransport
  ]
})

app.use(infoLogger);

configure(app);

app.use(errorLogger);

app.use(handleErrors);

app.listen(port, () => {
  console.log(port);
});

// 3 layer architechture
//  1. userController = Controller Layer: process the http resquests
//  2. UserService = Service Layer: process the object and send to data layer
//  3. Mongoose wrapper = Data Layer(ORM Layer): process the data and get/set to database
