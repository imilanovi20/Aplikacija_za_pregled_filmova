const Baza = require("./baza.js");

class FilmDAO {

	constructor() {
		this.baza = new Baza();
	}

	dajSve = async function () {
		this.baza.spojiSe();
		let sql = "SELECT * FROM film;"
		var podaci = await this.baza.izvrsiUpit(sql, []);
		this.baza.zatvoriVezu();
		return podaci;
	}

	daj = async function (id) {
		this.baza.spojiSe();
		let sql = "SELECT * FROM film WHERE id=?;"
		var podaci = await this.baza.izvrsiUpit(sql, [id]);
		this.baza.zatvoriVezu();
		if (podaci.length == 1)
			return podaci[0];
		else
			return null;
	}

	dodaj = async function (film) {
		console.log(film)
		let sql = `INSERT INTO film (id, adult, backdrop_path,original_language , original_title, overview, popularity, poster_path, release_date, title, video, odobreno, tagline,imdb_id,korisnik_id ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

		let podaci = [
			film.id,
			film.adult,
			film.backdrop_path,
			film.original_language,
			film.original_title,
			film.overview,
			film.popularity,
			film.poster_path,
			film.release_date,
			film.title,
			film.video,
			0,
			film.title,
			film.id,
			1
		];

		await this.baza.izvrsiUpit(sql, podaci);
		return true;
	}

	obrisi = async function (id) {
		let sql = "DELETE FROM film WHERE id=?";
		await this.baza.izvrsiUpit(sql, [id]);
		return true;
	}

	azuriraj = async function (id, film) {
		let sql = `UPDATE film SET naziv=?,datumIzlaska=?,vrijemeTrajanja=?,
        opis=?,budzet=?,jezik=?,titlovi=?,popularnost=?,prihod=?,slogan=?,prosjecna_ocjena=?,
        broj_glasova=?,imbd_id=?,status=?,video=? WHERE id=?`;

		let podaci = [film.naziv, film.datumIzlaska, film.vrijemeTrajanja,
		film.opis, film.budzet, film.jezik, film.titlovi, film.popularnost, film.prihod, film.slogan,
		film.prosjecna_ocjena, film.broj_glasova, film.imbd_id, film.status, film.video, id];

		await this.baza.izvrsiUpit(sql, podaci);
		return true;
	}
}

module.exports = FilmDAO;