import express from "express";
import {getOrder} from "./orders.service.js";
const orderRouter = express.Router();

orderRouter.get('/', getOrder);

export {orderRouter};