'use strict';

export default function(router) {
    const order = require('../controllers/order-controller');

    router.post(
        '/orderbystatus',
        order.read_order_items_by_category
    );

    router.post(
        '/order',
        order.create_order_item
    );
}