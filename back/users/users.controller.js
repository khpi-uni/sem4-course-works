import express from "express";
import {deleteUser, editUser, getUsers} from "./users.service.js";
import {passportAdminJWT, passportJWT} from "../auth/helpers/jwt.js";

const usersRouter = express.Router();

usersRouter.get('/get-all', passportAdminJWT, getUsers);
usersRouter.patch('/edit', passportAdminJWT, editUser);
usersRouter.delete('/delete', passportAdminJWT, deleteUser);

export {usersRouter};