import express from "express";
import configure from "./controllers";
import { connectWithDb, uri } from "./mongo";
import { handleErrors } from "./middlewares/handleErrors";
import winston from "winston";
import expressWinston from "express-winston";
import "winston-daily-rotate-file";
import winstonMongo from "winston-mongodb";
//import { ElasticsearchTransport } from "winston-elasticsearch";

const app = express();

app.use(express.json());

const processRequest = async (req, res, next) => {
  let correlationId = req.headers["x-correlation-id"];
  if (!correlationId) {
    correlationId = Date.now().toString();
    req.headers["x-correlation-id"] = correlationId;
  }

  res.set("x-correlation-id", correlationId);
  return next();
};

app.use(processRequest);

connectWithDb();

const getMessage = (req, res) => {
  let obj = {
    correlationId: req.headers["x-correlation-id"],
    reqruestBody: req.body,
  };
  return JSON.stringify(obj);
};

const fileInfoTransport = new winston.transports.DailyRotateFile({
  filename: "log-info-%DATE%.log",
  datePattern: "yyyy-MM-DD-HH",
});

const fileErrorTransport = new winston.transports.DailyRotateFile({
  filename: "log-error-%DATE%.log",
  datePattern: "yyyy-MM-DD-HH",
});

const mongoErrorTransport = new winston.transports.MongoDB({
  db: uri,
  metaKey: "meta",
});

// const elasticSearchOptions = {
//   level: "info",
//   clientOpts: { node: "http://localhost:9200" },
//   indexPrefix: "log-pretest",
// };
//const exTransport = new ElasticsearchTransport(elasticSearchOptions);

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
  transports: [
    new winston.transports.Console(),
    fileErrorTransport,
    mongoErrorTransport,
  ],
});

app.use(infoLogger);

configure(app);

app.use(errorLogger);

app.use(handleErrors);

export default app;
