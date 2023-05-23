import express from "express";
import {passportAdminJWT, passportJWT} from "../auth/helpers/jwt.js";
import {createProduct, getAllProducts} from "./products.service.js";

const productRouter = express.Router();

productRouter.get('/get-all', getAllProducts);
productRouter.post('/create', passportAdminJWT, createProduct);

export {productRouter};