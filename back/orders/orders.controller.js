import express from "express";
import {createOrder, deleteOrder, getAllOrders, getOrder, updateOrderStatus} from "./orders.service.js";
import {passportAdminJWT, passportJWT} from "../auth/helpers/jwt.js";
const orderRouter = express.Router();

orderRouter.get('/', passportJWT, getOrder);
orderRouter.get('/get-all', passportAdminJWT, getAllOrders);

orderRouter.post('/', passportJWT, createOrder);
orderRouter.post('/update-status', passportAdminJWT, updateOrderStatus);

orderRouter.delete('/', passportAdminJWT, deleteOrder);

export {orderRouter};