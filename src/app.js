import express from "express";
import configure from "./controllers";
import { connectWithDb, uri } from "./mongo";
import { errorLogger, infoLogger } from "./logger";
import { handleErrors, handleRequest } from "./middlewares/index";
import dotenv from "dotenv"
dotenv.config()

const app = express();

app.use(express.json());

app.use(handleRequest);

connectWithDb();

if(process.env.ENVIRONMENT != "TEST")
  app.use(infoLogger());

configure(app);

if(process.env.ENVIRONMENT != "TEST")
  app.use(errorLogger(uri));

app.use(handleErrors);

export default app;
