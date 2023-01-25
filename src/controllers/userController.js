import express, { response } from "express";
import {
  saveUser,
  getAllUsers,
  update,
  deleteById,
  getUserById,
} from "../services/userService";
import validators from "../models/view-models";
import { handleValidation } from "./../middlewares";

const router = express.Router();

const getHandler = async (req, res, next) => {
  try {
    const users = await getAllUsers();
    res.status(200).send(users);
  } catch (error) {
    return next(error, req, res);
  }
};
const getByIdHandler = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await getUserById(id);
    res.status(200).send(user);
  } catch (error) {
    return next(error, req, res);
  }
};
const postHandler = async (req, res, next) => {
  try {
    const body = req.body;
    const user = await saveUser(body);
    res.status(201).send(user._id);
  } catch (error) {
    return next(error, req, res);
  }
};

const putHandler = async (req, res, next) => {
  try {
    const body = req.body;
    const user = await update(body);
    res.status(200).send(user._id);
  } catch (error) {
    return next(error, req, res);
  }
};

const deleteHandler = async (req, res, next) => {
  try {
    const id = req.params.id;
    await deleteById(id);
    res.status(200).send("user deleted");
  } catch (error) {
    return next(error, req, res);
  }
};

router.get("/", getHandler);
// router.get("/getAllPaginated", getHandler);
router.get("/:id", getByIdHandler);
router.post("/", handleValidation(validators.userSchemaValidate), postHandler);
router.put("/", putHandler);
router.delete("/:id", deleteHandler);

const configure = (app) => {
  app.use("/users", router);
};

export default configure;
