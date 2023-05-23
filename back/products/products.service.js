import {getProductById, retrieveAllProducts} from "./helpers/products.js";
import {db} from "../db.js";

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
            newProduct: await getProductById(results.insertId),
            results
        })
    })
}