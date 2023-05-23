import express from "express";
import {
    addUserToBlacklist,
    deleteUser,
    editUser,
    getCurrentUser, getOrdersOfUser,
    getUsers,
    removeUserFromBlacklist
} from "./users.service.js";
import {passportAdminJWT, passportJWT} from "../auth/helpers/jwt.js";

const usersRouter = express.Router();

usersRouter.get('/get-all', passportAdminJWT, getUsers);
usersRouter.get('/me', passportJWT, getCurrentUser)

usersRouter.get('/orders', passportAdminJWT, getOrdersOfUser);

usersRouter.post('/add-to-blacklist', passportAdminJWT, addUserToBlacklist);
usersRouter.post('/remove-from-blacklist', passportAdminJWT, removeUserFromBlacklist)

usersRouter.patch('/edit', passportAdminJWT, editUser);

usersRouter.delete('/delete', passportAdminJWT, deleteUser);

export {usersRouter};