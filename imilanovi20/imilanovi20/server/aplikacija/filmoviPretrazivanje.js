const konst = require("../konstante.js");
//const portRest = require("portovi_rest.js").imilanovi20;
const url = "http://localhost:7000/api";
const kodovi = require("./moduli/kodovi.js")
class FilmoviZanroviPretrazivanje {

    async dohvatiFilmove(stranica, kljucnaRijec = "") {
        let putanja = url + "/tmdb/filmovi?stranica=" + stranica + "&kljucnaRijec=" + kljucnaRijec
        console.log(putanja)
        let odgovor = await fetch(putanja);
        let podaci = await odgovor.text();
        let filmovi = JSON.parse(podaci);
        console.log(filmovi)
        return filmovi;
    }

    async dohvatiSveZanrove() {
        
        let odgovor = await fetch(url + "/zanrovi");
        let podaci = await odgovor.text();
        console.log(podaci);
        let zanrovi = JSON.parse(podaci);
        console.log(zanrovi);
        return zanrovi;
    }

    async dohvatiKorisnika(korime) {
        
        let odgovor = await fetch(url + "/korisnici/" + korime);
        let podaci = await odgovor.text();
        console.log(podaci);
        let korisnik = JSON.parse(podaci);
        console.log(zanrovi);
        return korisnik;
    }

    async dohvatiNasumceFilm(zanr) {
        
        let odgovor = await fetch(url + "/tmdb/filmovi?stranica=1&kljucnaRijec=love");
        let podaci = await odgovor.text();
        let filmovi = JSON.parse(podaci);
        let rez = [filmovi.results[kodovi.dajNasumceBroj(0, 20)],
        filmovi.results[kodovi.dajNasumceBroj(0, 20)]];
        return rez;
    }

    async dohvatiNasumceFilmIzBaze(zanr) {
        
        let odgovor = await fetch(url + "/filmovi");
        let podaci = await odgovor.text();
        let filmovi = JSON.parse(podaci);
        console.log(filmovi);
        console.log(filmovi.length);
        let max = filmovi.length - 1;
        let rez = [filmovi[kodovi.dajNasumceBroj(0, max)],
        filmovi[kodovi.dajNasumceBroj(0, max)]];
        return rez;
    }

}



module.exports = FilmoviZanroviPretrazivanje;