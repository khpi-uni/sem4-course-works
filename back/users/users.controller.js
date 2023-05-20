import express from "express";
import {getUsers} from "./users.service.js";

const usersRouter = express.Router();

usersRouter.get('/', getUsers);

export {usersRouter};