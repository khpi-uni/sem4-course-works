import {login, signup} from "./auth.service.js";
import express from "express";

const authRouter = express.Router();

authRouter.post('/login', login);
authRouter.post('/signup', signup);

export {authRouter};