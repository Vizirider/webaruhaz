'use strict';

import customerRoutes from './src/routes/customer-routes';
import productRoutes from './src/routes/product-routes';
import orderRoutes from './src/routes/order-routes';
import express from 'express';
import { json, urlencoded } from 'body-parser';
const app = express();
const device = require('express-device');
const config = require('./config');

// SERVER CONFIGURATION
app.use(device.capture());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(express.static(__dirname));

// SETTING CORS-POLICY (FOR DEVELOPMENT)
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.header(
        'Access-Control-Allow-Methods',
        'GET, POST, OPTIONS, PUT, PATCH, DELETE'
    );
    res.header('Access-Control-Allow-Credentials', true);
    next();
});

// PREFIXING ROUTES
const router = express.Router();
customerRoutes(router);
productRoutes(router);
orderRoutes(router);
app.use(config.appVersion, router);

// START APPLICATION
app.listen(config.appPort, () => {
    console.log(`Product software ${config.appPort}...`);
});

// DATABASE CONNECTION
const mysql = require(config.dbDriver);
export const conn = mysql.createConnection({
    host: config.dbHost,
    user: config.dbUser,
    password: config.dbPassword,
    database: config.dbName,
    port: config.dbPort,
});
conn.connect(function(err) {
    if (err) {
        console.log('Database connection error! Error: ' + err);
    } else {
        console.log(
            `Connection to '${config.dbName}' database successful on port ${config.dbPort}!`
        );
    }
});

module.exports = app;
