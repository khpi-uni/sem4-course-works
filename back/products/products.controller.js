import express from "express";
import {passportAdminJWT} from "../auth/helpers/jwt.js";
import {createProduct, deleteProduct, editProduct, getAllProducts} from "./products.service.js";

const productRouter = express.Router();

productRouter.get('/get-all', getAllProducts);
productRouter.post('/', passportAdminJWT, createProduct);
productRouter.patch('/', passportAdminJWT, editProduct);
productRouter.delete('/', passportAdminJWT, deleteProduct);

export {productRouter};