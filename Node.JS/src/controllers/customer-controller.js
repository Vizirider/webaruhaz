'use strict';

import Customer from '../models/customer-model';


export function read_all_customer_items(req, res) {
    Customer.getAllCustomerItems(function(err, customer) {
        if (err) {
            res.status(400).send(err);
            return;
        } else {
            res.json({ customer });
            return;
        }
    });
}