import {findOrderById, processOrderWithProducts, retrieveOrderWithItemsById} from "./helpers/order.js";
import {getTotal} from "../products/helpers/products.js";
import {db} from "../db.js";

export const getOrder = async (req, res) => {
    const {id} = req.query;

    if (!id) {
        res.status(400).send({
            error: 'id is required'
        });

        return;
    }

    const response = await retrieveOrderWithItemsById(id);

    if (response.error) {
        res.status(400).send({
            error: response.error,
            orders: null
        })

        return;
    }

    console.log()

    res.send({
        ...processOrderWithProducts(response.orders)
    })
}

export const createOrder = async (req, res) => {
    let {orderInfo} = req.body;

    orderInfo = JSON.parse(orderInfo);

    if (!orderInfo) {
        res.status(400).send({
            error: 'Order info is required'
        });

        return;
    }

    let total = await getTotal(orderInfo);

    let sqlQuery = 'INSERT INTO orders (user_id, status, total, created_at, updated_at) VALUES (?, "new", ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)';

    db.query(sqlQuery, [req.user.id, total], async (err, results) => {
        if (err) {
            res.status(400).send({
                error: err
            });

            return;
        }

        try {
            await addOrderItemsToOrder(results.insertId, orderInfo);
        } catch (err) {
            res.status(400).send({
                error: err
            })
        }

        res.send({
            status: 'success',
            message: 'Order was successfully placed'
        })
    })
}

export const deleteOrder = async (req, res) => {
    const {id} = req.body;

    if (!id) {
        res.status(400).send({
            error: 'Id is required'
        });

        return;
    }

    const candidate = await findOrderById(id);

    console.log(candidate);

    if (!candidate.order) {
        res.status(400).send({
            error: 'Order with this id does not exist'
        })

        return;
    }

    let sqlQuery = 'DELETE FROM orders WHERE id = ?';

    db.query(sqlQuery, [id], (err, results) => {
        if (err) {
            res.status(400).send({
                error: err
            })

            return;
        }

        res.send({
            status: 'success',
            message: 'Order was successfully deleted',
            results
        });
    })
}

async function addOrderItemsToOrder(orderId, orderInfo) {
    for (let order of orderInfo) {
        let sqlQuery = 'INSERT INTO order_items (order_id, product_id, amount) VALUES (?, ?, ?)'
        await new Promise((resolve) => {
            db.query(sqlQuery, [orderId, order.productId, order.amount], (err) => {
                if (err) {
                    throw new Error(err);
                }

                resolve()
            })
        })
    }
}