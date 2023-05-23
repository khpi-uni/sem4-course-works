import {processOrderWithProducts, retrieveOrderWithItemsById} from "./helpers/order.js";

export const getOrder = async (req, res) => {
    const {id} = req.query;

    if (!id) {
        res.status(400).send({
            error: 'id is required'
        });

        return;
    }

    const response = await retrieveOrderWithItemsById(id);

    if(response.error) {
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