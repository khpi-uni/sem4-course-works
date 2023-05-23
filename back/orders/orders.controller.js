import express from "express";
import {createOrder, deleteOrder, getOrder} from "./orders.service.js";
import {passportAdminJWT, passportJWT} from "../auth/helpers/jwt.js";
const orderRouter = express.Router();

orderRouter.get('/', getOrder);
orderRouter.post('/', passportJWT, createOrder);
orderRouter.delete('/', passportAdminJWT, deleteOrder);

export {orderRouter};