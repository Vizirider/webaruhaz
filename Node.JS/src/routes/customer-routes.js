'use strict';

export default function(router) {
    const customer = require('../controllers/customer-controller');

    router.get(
        '/customer',
        customer.read_all_customer_items
    );
}