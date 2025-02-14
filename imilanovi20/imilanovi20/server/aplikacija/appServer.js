const konst = require("../konstante.js");
const express = require('express');
const sesija = require('express-session')
const kolacici = require('cookie-parser')
const Konfiguracija = require("../konfiguracija");

const htmlUpravitelj = require("./htmlUpravitelj.js");
const fetchUpravitelj = require("./fetchUpravitelj.js");
const port = 7001;
const server = express();


server.use(express.static(__dirname + "/angular"));

function pokreniServer() {

    server.use(express.urlencoded({ extended: true }));
    server.use(express.json());
    server.use(kolacici())
    server.use(sesija({
        secret: konst.tajniKljucSesija,
        saveUninitialized: true,
        cookie: { maxAge: 1000 * 60 * 60 * 3 },
        resave: false
    }));
    

    pripremiPutanjeAutentifikacija();
    
    server.use("/js", express.static(__dirname + "/js"));

    
    server.use((zahtjev, odgovor) => {
        odgovor.status(404);
        var poruka = { greska: "Stranica nije pronađena!" };
        
        odgovor.send(JSON.stringify(poruka));
    });

    server.listen(port, () => {
        console.log(`Server pokrenut na portu: ${port}`);
    });
}

let konf = new Konfiguracija();
konf.ucitajKonfiguraciju().then(pokreniServer).catch((greska) => {
    console.log(greska);
    if (process.argv.length == 2)
        console.error("Potrebno je dati naziv datoteke");
    else
        console.error("Nije moguće otvoriti datoteku: " + greska.path);
    process.exit()
});

function pripremiPutanjePocetna() {
    server.get("/", htmlUpravitelj.pocetna);
    server.get('/dajSveZanrove', fetchUpravitelj.dajSveZanrove);
    server.get('/dajDvaFilma', fetchUpravitelj.dajDvaFilma);
    server.get('/dajDvaFilmaIzBaze', fetchUpravitelj.dajDvaFilmaIzBaze);
}

function pripremiPutanjePretrazivanjeFilmova() {
    server.get('/filmoviPretrazivanje', htmlUpravitelj.filmoviPretrazivanje);
    server.post('/filmoviPretrazivanje', fetchUpravitelj.filmoviPretrazivanje);
    server.post('/dodajFilm', fetchUpravitelj.dodajFilm);
}

function pripremiPutanjeAutentifikacija() {
    
}

function pripremiPutanjeProfila() {
    server.get("/profil", htmlUpravitelj.profil);
}

function pripremiPutanjeFilma() {
    server.get("/film", htmlUpravitelj.film);
}

function pripremiPutanjePregledaFilmova() {
    server.get("/pregledFilmova", htmlUpravitelj.filmoviPregled);
}
function pripremiPutanjePrijedlogaFilmova() {
    server.get("/prijedlogFilmova", htmlUpravitelj.filmoviPrijedlozi);
}
function pripremiPutanjeGalerijaSlika() {
    server.get("/galerijaSlika", htmlUpravitelj.galerijaSlika);
}
function pripremiPutanjeSlika() {
    server.get("/slika", htmlUpravitelj.slika);
}
function pripremiPutanjezanrova() {
    server.get("/zanrovi", htmlUpravitelj.zanrovi);
}

function pripremiPutanjeDokumetacija() {
    server.get("/dokumentacija", htmlUpravitelj.dokumentacija);
}