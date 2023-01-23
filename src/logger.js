import winston from "winston";
import expressWinston from "express-winston";
import "winston-daily-rotate-file";
import winstonMongo from "winston-mongodb";
//import { ElasticsearchTransport } from "winston-elasticsearch";

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

const mongoErrorTransport = (uri) =>
  new winston.transports.MongoDB({
    db: uri,
    metaKey: "meta",
  });

// const elasticSearchOptions = {
//   level: "info",
//   clientOpts: { node: "http://localhost:9200" },
//   indexPrefix: "log-pretest",
// };
//const exTransport = new ElasticsearchTransport(elasticSearchOptions);

export const infoLogger = () =>
  expressWinston.logger({
    transports: [new winston.transports.Console(), fileInfoTransport],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    ),
    meta: true,
    msg: getMessage,
  });

export const errorLogger = (uri) =>
  expressWinston.errorLogger({
    transports: [
      new winston.transports.Console(),
      fileErrorTransport,
      mongoErrorTransport(uri),
    ],
  });