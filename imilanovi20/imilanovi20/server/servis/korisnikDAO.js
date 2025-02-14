const Baza = require("./baza.js");

class KorisnikDAO {

	constructor() {
		this.baza = new Baza();
	}

	dajSve = async function () {
		this.baza.spojiSe();
		let sql = "SELECT * FROM korisnik;"
		var podaci = await this.baza.izvrsiUpit(sql, []);
		this.baza.zatvoriVezu();
		return podaci;
	}

	daj = async function (korime) {
		this.baza.spojiSe();
		let sql = "SELECT * FROM korisnik WHERE korime=?;"
		var podaci = await this.baza.izvrsiUpit(sql, [korime]);
		this.baza.zatvoriVezu();
		if (podaci.length == 1)
			return podaci[0];
		else
			return null;
	}

	dodaj = async function (korisnik) {
		console.log(korisnik)

		let sql = `INSERT INTO korisnik (id, korime, lozinka, ime, prezime, uloga_id)) VALUES (?,?,?,?,?,?)`;
		let podaci = [korisnik.id, korisnik.korime, korisnik.lozinka,
		korisnik.ime, korisnik.prezime, 2];

		await this.baza.izvrsiUpit(sql, podaci);


		return true;
	}

	obrisi = async function (korime) {
		let sql = "DELETE FROM korisnik WHERE korime=?";
		await this.baza.izvrsiUpit(sql, [korime]);
		return true;
	}

	azuriraj = async function (korime, korisnik) {
		let sql = `UPDATE korisnik SET lozinka=?, ime = ?, prezime =?,drzavaStanovanja=?, mestoStanovanja=?, datumRodenja=? WHERE korime=?`;
		let podaci = [korisnik.lozinka,
		korisnik.ime, korisnik.prezime, korisnik.drzavaStanovanja, korisnik.mjestoStanovanja,
		korisnik.datumRodenja, korime];
		await this.baza.izvrsiUpit(sql, podaci);
		return true;
	}

	aktiviraj = async function (korime, korisnik) {
		this.baza = new Baza();
		this.baza.spojiSe();
		let sql = `UPDATE korisnik SET aktiviran=? WHERE korime=?`;
		let podaci = [korisnik.aktiviran, korime];
		await this.baza.izvrsiUpit(sql, podaci);
		this.baza.zatvoriVezu();
		return true;
	}
}

module.exports = KorisnikDAO;