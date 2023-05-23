import {db} from "../../db.js";

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

export const getProductById = async (id) => {
    if(!id) {
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