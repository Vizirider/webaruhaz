'use strict';

import { conn } from '../../app';

const SELECT_PROPERTIES_QUERY_PART = `SELECT megrendeles.azonosito, megrendeles.termek_azonosito, megrendeles.vevo_azonosito, megrendeles.mennyiseg, megrendeles.vegosszeg, 
megrendeles.megrendeles_datuma, megrendeles.utolso_frissites_datuma, megrendeles.fizetesi_mod, megrendeles.status FROM megrendeles`;


export default class Order {
    constructor(orderItem) {
        this.azonosito = orderItem.azonosito;
        this.termek_azonosito = orderItem.termek_azonosito;
        this.vevo_azonosito = orderItem.vevo_azonosito;
        this.mennyiseg = orderItem.mennyiseg;
        this.vegosszeg = orderItem.vegosszeg;
        this.megrendeles_datuma = new Date(orderItem.megrendeles_datuma);
        this.utolso_frissites_datuma = new Date(orderItem.utolso_frissites_datuma);
        this.fizetesi_mod = orderItem.fizetesi_mod;
        this.status = orderItem.status;
    }

    static getOrderItemsByStatusName(StatusName, res) {
        conn.query(
            `${SELECT_PROPERTIES_QUERY_PART}
                WHERE megrendeles.status = ?`,
            [StatusName],
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

    static addOrderItem(newItem, res) {
        conn.query(
            'SELECT * FROM termek WHERE termek.cikkszam = ? AND termek.mennyiseg <= 1',
            [newItem.termek_azonosito],
                function(err, result){
                    if(err) {
                        return res(err, null);
                    }
                    if(result.length > 0) {
                        res('Termek kifogyott!', null);
                    } else {
                        conn.query(
                            'SELECT * FROM termek WHERE termek.cikkszam = ?',
                            [newItem.termek_azonosito],
                                function(err, result){
                                    if(err) {
                                        return res(err, null);
                                    }
                                    if(result.length == 0) {
                                        res('Termek azonosito nem letezik!', null);
                                    } else {
                                        conn.query(
                                            'INSERT INTO `megrendeles` (`termek_azonosito`, `vevo_azonosito`, `mennyiseg`, `vegosszeg`, `megrendeles_datuma`, `utolso_frissites_datuma`, `fizetesi_mod`) ' +
                                            'VALUES (?,?,1,' +
                                            '(SELECT termek.ar FROM termek WHERE termek.cikkszam = ?),NOW(),NOW(), ?)'         
                                            ,
                                        [
                                            newItem.termek_azonosito,
                                            newItem.vevo_azonosito,
                                            newItem.termek_azonosito,
                                            newItem.fizetesi_mod,
                                            newItem.termek_azonosito
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
                                    conn.query(
                                        'UPDATE termek SET termek.mennyiseg = termek.mennyiseg - 1 WHERE termek.cikkszam = ?'          
                                        ,
                                    [
                                        newItem.termek_azonosito
                                    ],
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
                            }
                        );    
                    }
                }
            );
        }
}