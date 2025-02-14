const ds = require("fs/promises");
const jwt = require("./moduli/jwt.js")
const totp = require("./moduli/totp.js")
const Autentifikacija = require("./autentifikacija.js")
let auth = new Autentifikacija();

exports.pocetna = async function (zahtjev, odgovor) {
    let pocetna = await ucitajStranicu("pocetna")
    odgovor.send(pocetna);
}

exports.registracija = async function (zahtjev, odgovor) {
    console.log(zahtjev.body)
    let greska = "";
    if (zahtjev.method == "POST") {
        let uspjeh = await auth.dodajKorisnika(zahtjev.body);
        if (uspjeh) {
            odgovor.redirect("/prijava");
            return;
        } else {
            greska = "Dodavanje nije uspjelo provjerite podatke!";
        }
    }

    let stranica = await ucitajStranicu("registracija", greska);
    odgovor.send(stranica);
}

exports.odjava = async function (zahtjev, odgovor) {
    zahtjev.session.korisnik = null;
    odgovor.redirect("/");
};

exports.prijava = async function (zahtjev, odgovor) {
    let greska = ""
    if (zahtjev.method == "POST") {
        var korime = zahtjev.body.korime;
        var lozinka = zahtjev.body.lozinka;
        var korisnik = await auth.prijaviKorisnika(korime, lozinka);

        if (korisnik) {
            
            
            if (false) {
                greska = "TOTP nije dobar!"
            } else {
                zahtjev.session.jwt = jwt.kreirajToken(korisnik)
                zahtjev.session.korisnik = korisnik.ime + " " + korisnik.prezime;
                zahtjev.session.korime = korisnik.korime;
                odgovor.redirect("/");
                return;
            }
        } else {
            greska = "Netocni podaci!";
        }
    }

    let stranica = await ucitajStranicu("prijava", greska);
    odgovor.send(stranica);
}


exports.filmoviPretrazivanje = async function (zahtjev, odgovor) {
    let stranica = await ucitajStranicu("filmovi_pretrazivanje");
    odgovor.send(stranica);
}

exports.profil = async function (zahtjev, odgovor) {
    let stranica = await ucitajStranicu("profil");
    odgovor.send(stranica);
}

exports.film = async function (zahtjev, odgovor) {
    let stranica = await ucitajStranicu("film");
    odgovor.send(stranica);
}

exports.filmoviPregled = async function (zahtjev, odgovor) {
    let stranica = await ucitajStranicu("filmovi_pregled");
    odgovor.send(stranica);
}

exports.filmoviPrijedlozi = async function (zahtjev, odgovor) {
    let stranica = await ucitajStranicu("filmovi_prijedlozi");
    odgovor.send(stranica);
}

exports.galerijaSlika = async function (zahtjev, odgovor) {
    let stranica = await ucitajStranicu("galerija_slika");
    odgovor.send(stranica);
}

exports.slika = async function (zahtjev, odgovor) {
    let stranica = await ucitajStranicu("slika");
    odgovor.send(stranica);
}

exports.zanrovi = async function (zahtjev, odgovor) {
    let stranica = await ucitajStranicu("zanrovi");
    odgovor.send(stranica);
}

async function ucitajStranicu(nazivStranice, poruka = "") {
    let stranice = [ucitajHTML(nazivStranice),
    ucitajHTML("navigacija")];
    let [stranica, nav] = await Promise.all(stranice);
    stranica = stranica.replace("#navigacija#", nav);
    stranica = stranica.replace("#poruka#", poruka)
    return stranica;
}

function ucitajHTML(htmlStranica) {
    return ds.readFile(__dirname + "/html/" + htmlStranica + ".html", "UTF-8");
}

exports.dokumentacija=async function(zahtjev,odgovor){
    let stranice =[ ds.readFile("/var/www/RWA/2022/zadaca_01/imilanovi20/dokumentacija/dokumentacija.html","UTF-8" ),
    ucitajHTML("navigacija")];
    let [stranica, nav] = await Promise.all(stranice);
    stranica = stranica.replace("#navigacija#", nav);
    stranica = stranica.replace("#poruka#", "")
    odgovor.send(stranica);

}