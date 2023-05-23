import {findProductById, retrieveAllProducts} from "./helpers/products.js";
import {db} from "../db.js";
import e from "express";

export const getAllProducts = async (req, res) => {
    const productsObj = await retrieveAllProducts();

    if (productsObj.hasOwnProperty('error') && productsObj.error) {
        res.statusCode(500).send({
            error: productsObj.error,
            users: null
        })

        return;
    }

    res.send({
        products: productsObj.products
    })
}

export const createProduct = async (req, res) => {
    let {title, price, description, inStock, thumbnailId} = req.body;

    if (!title) {
        res.status(400).send({
            error: 'Title is required'
        })

        return;
    }

    if (!price) {
        res.status(400).send({
            error: 'Price is required'
        })

        return;
    }

    if (inStock === null || inStock === undefined) {
        inStock = 0;
    }

    if (inStock === false) {
        inStock = 0;
    }

    if (inStock === true) {
        inStock = 1;
    }


    let sqlQuery = 'INSERT INTO products (created_by_id, title, price, description, in_stock, thumbnail_id) VALUES (?, ?, ?, ?, ?, ?)';

    db.query(sqlQuery, [req.user.id, title, price, description, inStock, thumbnailId], async (err, results) => {
        if (err) {
            res.status(400).send({
                error: err
            })

            return;
        }

        res.send({
            status: 'success',
            message: 'Product was successfully created',
            newProduct: await findProductById(results.insertId),
            results
        })
    })
}

export const deleteProduct = async (req, res) => {
    const {id} = req.body;

    if (!id) {
        res.status(400).send({
            error: 'id is required'
        })

        return;
    }

    const candidate = await findProductById(id);

    if (!candidate) {
        res.status(400).send({
            error: 'Product with this id does not exist'
        });

        return;
    }

    let sqlQuery = 'DELETE FROM products WHERE id = ?';

    db.query(sqlQuery, [id], (err, results) => {
        if (err) {
            res.status(400).send({
                error: err
            })

            return;
        }

        res.send({
            status: 'success',
            message: 'Product was successfully deleted',
            results
        })
    })
}