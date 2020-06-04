'use strict';

import Order from '../models/order-model';

export function read_order_items_by_category(req, res) {
    Order.getOrderItemsByStatusName(req.body.StatusName, function(
        err,
        orders
    ) {
        if (err) {
            res.status(400).send(err);
            return;
        } else {
            res.json({ orders });
            return;
        }
    });
}

export function create_order_item(req, res) {
    const newItem = new Order(req.body);
    Order.addOrderItem(newItem, function(err, insertId) {
        if (err) {
            res.status(400).send(err);
            return;
        } else {
            res.status(200).send(
                `Picked up new order item with the ID: ${insertId}.`
            );
            return;
        }
    });
}
