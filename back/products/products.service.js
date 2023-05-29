import {findProductById, processProducts, retrieveAllProducts} from "./helpers/products.js";
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
        products: await processProducts(productsObj.products)
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

export const editProduct = async (req, res) => {
    const {id} = req.body;

    if (!id) {
        res.status(400).send({
            error: 'product id is required'
        })

        return;
    }

    const product = await findProductById(id);

    if (!product) {
        res.status(400).send({
            error: 'product with this id does not exist'
        });

        return;
    }

    let {
        createdBy: newCreatedBy,
        price: newPrice,
        title: newTitle,
        description: newDescription,
        inStock: newInStock,
        thumbnailId: newThumbnailId,
    } = req.body;

    const updatedProduct = {
        createdBy: newCreatedBy ?? product.created_by_id,
        price: newPrice ?? product.price,
        title: newTitle ?? product.title,
        description: newDescription ?? product.description,
        inStock: newInStock ?? product.in_stock,
        thumbnailId: newThumbnailId ?? product.thumbnail_id,
    };

    let sqlQuery = 'UPDATE products SET created_by_id = ?, price = ?, title = ?, description = ?, in_stock = ?, thumbnail_id = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?';

    db.query(sqlQuery, [...Object.values(updatedProduct), product.id], async (err, results) => {
        if (err) {
            res.status(400).send({
                error: err
            })

            return;
        }

        res.send({
            message: 'product was successfully edited',
            updatedProduct: await findProductById(product.id),
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