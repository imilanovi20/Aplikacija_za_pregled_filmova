const konst = require("../konstante.js");
const sqlite3 = require("sqlite3");
const ds = require("fs");

class Baza {


    constructor() {
        this.vezaDB = new sqlite3.Database("../baza.sqlite", (err) => {
            if (err) {    
                console.log("Greska!!");
            }
        })
    }

    spojiSe() {
        this.vezaDB = new sqlite3.Database("../baza.sqlite", (err) => {
            if (err) {    
                console.log("Greska!!");
            }
        })
    }

    ucitajPodatke() {
        let podaciTekst = ds.readFileSync(konst.podaciZaBazu, "UTF-8");
        this.podaciBaza = JSON.parse(podaciTekst);
    }

    izvrsiUpit(sql, podaciZaSQL) {
        return new Promise((uspjeh, neuspjeh) => {
            this.vezaDB.all(sql, podaciZaSQL, (greska, rezultat) => {
                if (greska)
                    neuspjeh(greska);
                else
                    uspjeh(rezultat);
            });
        });
    }

    zatvoriVezu() {
        this.vezaDB.close();
    }
}

module.exports = Baza;