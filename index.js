import express from "express";
import configure from "./controllers";
import connectWithDb from "./mongo";
import { handleErrors } from './middlewares/handleErrors';

const port = 3000;
const app = express();

app.use(express.json());

connectWithDb();

configure(app);

app.use(handleErrors);

app.listen(port, () => {
  console.log(port);
});


// 3 layer architechture
//  1. userController = Controller Layer: process the http resquests
//  2. UserService = Service Layer: process the object and send to data layer
//  3. Mongoose wrapper = Data Layer(ORM Layer): process the data and get/set to database
