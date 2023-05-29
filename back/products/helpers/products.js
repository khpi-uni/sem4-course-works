import {db} from "../../db.js";
import {getMediaUrlById} from "../../media/media.js";

export const retrieveAllProducts = () => {
    let sqlQuery = 'SELECT * FROM products';
    return new Promise((resolve, reject) => {
        db.query(sqlQuery, [], (err, results) => {
            if (err) {
                reject({error: err, products: null});
            } else if (!Array.isArray(results)) {
                reject({error: 'Database did not return array for products', products: null});
            } else {
                resolve({products: results});
            }
        });
    });
}

export const findProductById = async (id) => {
    if (!id) {
        return null;
    }

    let sqlQuery = 'SELECT * FROM products WHERE id=?';

    return new Promise((resolve, reject) => {
        db.query(sqlQuery, [id], (err, results) => {
            if (err) {
                reject({error: err, user: null});
            }

            resolve(results[0]);
        });
    });
}

export const getProductPriceById = async (id) => {
    const product = await findProductById(id);

    if (!product) {
        return 0;
    }

    return parseFloat(product.price);
}

export const getTotal = async (orderInfo) => {
    if(!orderInfo) {
        return 0;
    }

    if(!Array.isArray(orderInfo)) {
        return 0;
    }

    let total = 0;

    for(let orderInfoItem of orderInfo) {
        total += await getProductPriceById(orderInfoItem.productId) * orderInfoItem.amount;
    }

    return total;
}

export const processProducts = async (products) => {

    for(const product of products) {
        const {thumbnail_id: thumbnailId} = product;
        if(!thumbnailId) {
            return;
        }

        product.thumbnail_url = await getMediaUrlById(thumbnailId);
    }

    return products;
}
