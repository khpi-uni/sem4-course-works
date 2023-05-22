import express from "express";
import {deleteUser, getUsers} from "./users.service.js";
import {passportAdminJWT, passportJWT} from "../auth/helpers/jwt.js";

const usersRouter = express.Router();

usersRouter.get('/get-all', passportAdminJWT, getUsers);
usersRouter.delete('/delete', passportAdminJWT, deleteUser);

export {usersRouter};