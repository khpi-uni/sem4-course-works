import {retrieveAllProducts} from "./helpers/products.js";

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