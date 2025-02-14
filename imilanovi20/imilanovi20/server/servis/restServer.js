const konst = require("../konstante.js");
const express = require('express');
const Konfiguracija = require("../konfiguracija");

const cors = require('cors');

const restKorisnici = require("./restKorisnik.js")
const RestTMDB = require("./restTMDB");
const restFilmovi = require("./restFilm.js")
const restZanrovi = require("./restZanr.js")

const port = 7000; // = rest port
const server = express();
server.use(cors());

let konf = new Konfiguracija();
konf.ucitajKonfiguraciju().then(pokreniServer).catch((greska) => {
    if (process.argv.length == 2)
        console.error("Potrebno je unjeti naziv datoteke!");
    else
        console.error("Naziv datoteke nije dobar: " + greska.path);
    process.exit()
});

function pokreniServer() {
    server.use(express.urlencoded({ extended: true }));
    server.use(express.json());

    pripremiPutanjeKorisnik();
    pripremiPutanjeTMDB();
    pripremiPutanjeFilm();
    pripremiPutanjeZanr();


    server.use((zahtjev, odgovor) => {
        odgovor.status(404);
        let poruka = { greska: "Stranica nije pronađena!" }
        odgovor.json(poruka);
    });

    server.listen(port, () => {
        console.log(`Server pokrenut na portu: ${port}`);
    });
}

function pripremiPutanjeKorisnik() {
    server.get("/api/korisnici", restKorisnici.getKorisnici);
    server.post("/api/korisnici", restKorisnici.postKorisnici);
    server.put("/api/korisnici", restKorisnici.putKorisnici);
    server.delete("/api/korisnici", restKorisnici.deleteKorisnici);

    server.get("/api/korisnici/:korime", restKorisnici.getKorisnik);
    server.post("/api/korisnici/:korime", restKorisnici.postKorisnik);
    server.put("/api/korisnici/:korime", restKorisnici.putKorisnik);
    server.delete("/api/korisnici/:korime", restKorisnici.deleteKorisnik);
    server.post("/api/korisnici/:korime/prijava", restKorisnici.getKorisnikPrijava);

    server.get("/api/korisnici/:korime/prijava", restKorisnici.gettttttKorisnikPrijava);
    server.put("/api/korisnici/:korime/prijava", restKorisnici.putKorisnikPrijava);
    server.delete("/api/korisnici/:korime/prijava", restKorisnici.deleteKorisnikPrijava);


    server.get("/api/korisnici/:korime/aktivacija", restKorisnici.getKorisnikAktiviraj);
    server.post("/api/korisnici/:korime/aktivacija", restKorisnici.postKorisnikAktiviraj);
    server.delete("/api/korisnici/:korime/aktivacija", restKorisnici.deleteKorisnikAktiviraj);
    server.put("/api/korisnici/:korime/aktivacija", restKorisnici.putKorisnikAktiviraj);
}

function pripremiPutanjeTMDB() {
    let restTMDB = new RestTMDB(konf.dajKonf()["tmdb.apikey.v3"]);
    server.get("/api/tmdb/zanr", restTMDB.getZanr.bind(restTMDB));
    server.get("/api/tmdb/filmovi", restTMDB.getFilmovi.bind(restTMDB));
}

function pripremiPutanjeFilm() {
    server.get("/api/filmovi", restFilmovi.getFilmovi);
    server.post("/api/filmovi", restFilmovi.postFilmovi);
    server.put("/api/filmovi", restFilmovi.putFilmovi);
    server.delete("/api/filmovi", restFilmovi.deleteFilmovi);

    server.get("/api/filmovi/:id", restFilmovi.getFilm)
    server.post("/api/filmovi/:id", restFilmovi.postFilm);
    server.put("/api/filmovi/:id", restFilmovi.putFilm);
    server.delete("/api/filmovi/:id", restFilmovi.deleteFilm);
}

function pripremiPutanjeZanr() {
    server.get("/api/zanr", restZanrovi.getZanrovi);
    server.post("/api/zanr", restZanrovi.postZanrovi);
    server.put("/api/zanr", restZanrovi.putZanrovi);
    server.delete("/api/zanr", restZanrovi.deleteZanrovi);

    server.get("/api/zanr/:id", restZanrovi.getZanr);
    server.post("/api/zanr/:id", restZanrovi.postZanr);
    server.put("/api/zanr/:id", restZanrovi.putZanr);
    server.delete("/api/zanr/:id", restZanrovi.deleteZanr);

}

