'use strict';

import Product from '../models/product-model';

export function create_product_item(req, res) {
    const newItem = new Product(req.body);
    Product.addProductItem(newItem, function(err, insertId) {
        if (err) {
            res.status(400).send(err);
            return;
        } else {
            res.status(200).send(
                `Picked up new product item with the ID: ${insertId}.`
            );
            return;
        }
    });
}

export function read_all_product_items(req, res) {
    Product.getAllProductItems(function(err, product) {
        if (err) {
            res.status(400).send(err);
            return;
        } else {
            res.json({ product });
            return;
        }
    });
}
