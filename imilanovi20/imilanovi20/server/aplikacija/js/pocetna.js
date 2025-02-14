let url = "http://localhost:7001";


window.addEventListener("load", async () => {
    let main = document.getElementsByTagName("main")[0];
    let prikaz = "<ol>";
    //console.log(await dohvatiFilmove("love",1));
    for (let p of await dohvatiZanrove()) {
        prikaz += "<li>" + p.naziv;
        let filmovi = await dohvatiFilmove(p.naziv);
        console.log(filmovi);
        prikaz += "<ul>";
        prikaz += "<li>" + filmovi[0]["naziv"] + "</li>"
        prikaz += "<li>" + filmovi[1]["naziv"] + "</li>"
        prikaz += "</ul></li>"
    }
    main.innerHTML = prikaz + "</ol>";
});

async function dohvatiZanrove() {
    //vamo
    let odgovor = await fetch(url + "/dajSveZanrove");
    let podaci = await odgovor.text();
    console.log(podaci);
    let zanrovi = JSON.parse(podaci);
    return zanrovi;
}

async function dohvatiFilmove(zanr) {
    let odgovor = await fetch(url + "/dajDvaFilmaIzBaze");
    let podaci = await odgovor.text();
    let filmovi = JSON.parse(podaci);
    return filmovi;
}
