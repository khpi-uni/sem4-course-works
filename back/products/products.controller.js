import express from "express";
import {passportAdminJWT, passportJWT} from "../auth/helpers/jwt.js";
import {createProduct, deleteProduct, getAllProducts} from "./products.service.js";

const productRouter = express.Router();

productRouter.get('/get-all', getAllProducts);
productRouter.post('/', passportAdminJWT, createProduct);
productRouter.delete('/', passportAdminJWT, deleteProduct);

export {productRouter};