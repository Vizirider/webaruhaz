'use strict';

export default function(router) {
    const product = require('../controllers/product-controller');

    router.get(
        '/nullproduct',
        product.read_all_product_items
    );

    router.post(
        '/productadd',
        product.create_product_item
    );
}