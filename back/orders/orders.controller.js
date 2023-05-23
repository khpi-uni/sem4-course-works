import express from "express";
import {createOrder, getOrder} from "./orders.service.js";
import {passportJWT} from "../auth/helpers/jwt.js";
const orderRouter = express.Router();

orderRouter.get('/', getOrder);
orderRouter.post('/', passportJWT, createOrder);

export {orderRouter};