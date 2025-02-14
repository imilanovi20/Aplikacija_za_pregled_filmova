const Baza = require("./baza.js");

class ZanrDAO {

	constructor() {
		this.baza = new Baza();
	}

	dajSve = async function () {
		this.baza.spojiSe();
		let sql = "SELECT * FROM zanr;"
		var podaci = await this.baza.izvrsiUpit(sql, []);
		this.baza.zatvoriVezu();
		return podaci;
	}

	daj = async function (id) {
		this.baza.spojiSe();
		let sql = "SELECT * FROM zanr WHERE id=?;"
		var podaci = await this.baza.izvrsiUpit(sql, [id]);
		this.baza.zatvoriVezu();
		if (podaci.length == 1)
			return podaci[0];
		else
			return null;
	}

	dodaj = async function (zanr) {
		console.log(zanr)
		let sql = `INSERT INTO zanr (id,name) VALUES (?,?)`;
		let podaci = [zanr.id, zanr.name];
		await this.baza.izvrsiUpit(sql, podaci);
		return true;
	}

	obrisi = async function (id) {
		let sql = "DELETE FROM zanr WHERE id=?";
		await this.baza.izvrsiUpit(sql, [id]);
		return true;
	}

	azuriraj = async function (zanr) {
		let sql = `UPDATE zanr SET name=? WHERE id=?`;
		let podaci = [zanr.name, zanr.id];
		await this.baza.izvrsiUpit(sql, podaci);
		return true;
	}

	obrisiSveOsim = async function () {
		this.baza.spojiSe();
		let sql = "DELETE FROM zanr WHERE zanr.id NOT IN (SELECT film_zanr.zanr_id FROM film_zanr)";
		await this.baza.izvrsiUpit(sql, []);
		this.baza.zatvoriVezu();
		return true;
	}
}

module.exports = ZanrDAO;