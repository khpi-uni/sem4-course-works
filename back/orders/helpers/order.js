import {db} from "../../db.js";

export const retrieveAllOrdersForUserById = (id) => {
    let sqlQuery = 'SELECT * FROM orders WHERE id = ?';
    return new Promise((resolve, reject) => {
        db.query(sqlQuery, [id], (err, results) => {
            if (err) {
                reject({error: err, orders: null});
            } else if (!Array.isArray(results)) {
                reject({error: 'Database did not return array for orders', orders: null});
            } else {
                resolve({orders: results});
            }
        });
    });
}

export const retrieveOrderWithItemsById = (id) => {
    if (!id) {
        return null;
    }

    let sqlQuery = 'SELECT orders.id AS `order_id`, orders.user_id, orders.status, orders.total, orders.created_at, products.id AS `product_id`, products.title, order_items.amount FROM orders JOIN order_items ON orders.id = order_items.order_id JOIN products ON order_items.id = products.id WHERE orders.id = ?';

    return new Promise((resolve, reject) => {
        db.query(sqlQuery, [id], (err, results) => {
            if (err) {
                reject({error: err, order: null});
            } else {
                resolve({orders: results});
            }
        });
    });
}

export const retrieveOrdersWithItemsByUserId = (id) => {
    if (!id) {
        return null;
    }

    let sqlQuery = 'SELECT orders.id AS `order_id`, orders.user_id, orders.status, orders.total, orders.created_at, products.id AS `product_id`, products.title, order_items.amount FROM orders LEFT JOIN order_items ON orders.id = order_items.order_id LEFT JOIN products ON order_items.id = products.id WHERE orders.user_id = ?';

    return new Promise((resolve, reject) => {
        db.query(sqlQuery, [id], (err, results) => {
            if (err) {
                reject({error: err, order: null});
            } else {
                resolve({orders: results});
            }
        });
    });
}

export const processOrderWithProducts = (orderWithProducts) => {
    if (!orderWithProducts) {
        return null;
    }

    if (!Array.isArray(orderWithProducts)) {
        return null;
    }

    const anOrder = orderWithProducts[0];
    const orderData = {
        orderId: anOrder.order_id,
        userId: anOrder.user_id,
        status: anOrder.status,
        total: anOrder.total,
        createdAt: anOrder.created_at,
        products: []
    };

    orderWithProducts.forEach(order => {
        if (!order.product_id) {
            return;
        }

        orderData.products.push({
            productId: order.product_id,
            title: order.title,
            amount: order.amount
        })
    });

    return orderData;
}

export const processOrdersOfUser = (orders) => {
    if(!orders) {
        return null;
    }

    if(!Array.isArray(orders)) {
        return null;
    }

    const orderMap = {};

    orders.forEach(order => {
        const orderId = order.order_id;
        if(!orderId) {
            return;
        }

        if(!(orderId in orderMap)) {
            orderMap[orderId] = {
                orderId,
                userId: order.user_id,
                status: order.status,
                total: order.total,
                createdAt: order.createdAt,
                products: []
            }
        }

        if(!order.product_id) {
            return;
        }

        orderMap[orderId].products.push({
            productId: order.product_id,
            productTitle: order.title,
            amount: order.amount
        });
    });

    return Object.values(orderMap);
}