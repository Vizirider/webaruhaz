import { conn } from '../../app';

const SELECT_PROPERTIES_QUERY_PART = `SELECT vevo.nev, vevo.email, vevo.szuletesi_ido, szamlazasi_szallitasi.azonosito, szamlazasi_szallitasi.cim_tipusa,
szamlazasi_szallitasi.nev, szamlazasi_szallitasi.orszag, szamlazasi_szallitasi.varos, szamlazasi_szallitasi.iranyitoszam, szamlazasi_szallitasi.lakcim`;
const INNER_JOIN_QUERY_PART = `FROM vevo INNER JOIN szamlazasi_szallitasi ON vevo.szallitasi_szamlazasi_azonosito =  szamlazasi_szallitasi.azonosito`;

export default class Customer {
    constructor(customerItem) {
        this.nev = customerItem.nev;
        this.cikkszam = customerItem.email;
        this.leiras = customerItem.szuletesi_ido;
        this.gyarto = customerItem.szallitasi_szamlazasi_azonosito;
    }

    static getAllCustomerItems(res) {
        conn.query(
            `${SELECT_PROPERTIES_QUERY_PART} ${INNER_JOIN_QUERY_PART}`,
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

}