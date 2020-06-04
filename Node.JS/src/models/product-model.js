import { CATEGORIES } from '../shared/constansts';
import { conn } from '../../app';

const SELECT_PROPERTIES_QUERY_PART = `SELECT termek.nev, termek.cikkszam, termek.leiras, termek.gyarto, termek.ar, termek.mennyiseg FROM termek`;
const SELECT_FILTER = `WHERE termek.mennyiseg = 0`;

export default class Product {
    constructor(productItem) {
        this.nev = productItem.nev;
        this.cikkszam = productItem.cikkszam;
        this.leiras = productItem.leiras;
        this.gyarto = productItem.gyarto;
        this.ar = productItem.ar;
        this.mennyiseg = productItem.mennyiseg;
    }

    static getAllProductItems(res) {
        conn.query(
            `${SELECT_PROPERTIES_QUERY_PART} ${SELECT_FILTER}`,
            [],
            function(err, result) {
                if (err) {
                    console.log('Error: ', err);
                    res(err, null);
                } else {
                    res(null, result);
                }
            }
        );
    }

    static addProductItem(newItem, res) {
        conn.query(
            'INSERT INTO `termek` (`nev`, `leiras`, `gyarto`, `ar`, `mennyiseg`) ' +
                'VALUES (?, ?, ?, ?, ?)',
            [
                newItem.nev,
                newItem.leiras,
                newItem.gyarto,
                newItem.ar,
                newItem.mennyiseg
            ],
            function(err, response) {
                if (err) {
                    console.log('Error: ', err);
                    res(err, null);
                } else {
                    res(null, response.insertId);
                }
            }
        );
    }

}