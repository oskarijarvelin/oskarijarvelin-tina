---
title: Gatsby.js ja TinaCMS - Seuraavan sukupolven verkkosivustot
date: '2020-10-18T09:28:03.649Z'
type: post
path: /blogi/gatsby-js-ja-tinacms---seuraavan-sukupolven-verkkosivustot
draft: false
hero:
  image: ../images/laptop-3174729_1920.jpg
---
Uskallan väittää että verkkosivustoni on toteutettu uusimmilla web-teknologioilla, vaikka uusia teknologioita ja JavaScript-kirjastoja syntyy webin uumenissa päivittäin. Sivustoni on nimittäin toteutettu kaksi vuotta vanhalla _React_-pohjaisella **Gatsby.js** -frameworkillä ja vuoden vanhalla **TinaCMS** -sisältöeditorilla.

Pyrin avaamaan tässä artikkelissa aluksi yleisesti valitsemieni teknologioiden hyötyjä ja heikkouksia yleistajuisemmin syventyen loppua kohden teknisimpiin yksityiskohtiin.

## Nykysukupolven verkkosivuteknologiat

Valtaosa verkkosivustoista rakentuu niin kutsutulle **LAMP**-stackin päälle. Stackilla tarkoitetaan tässä yhteydessä sellaista ohjelmistokokoelmaa, joilla verkkosivusto saadaan toimimaan. Termi tulee sanoista **Linux** (palvelimen käyttöjärjestelmä), **Apache** (palvelinohjelmisto), **MySQL** (tietokantaohjelmisto) ja **PHP** (ohjelmointikieli). Tämä stack on mm. jokaisen WordPress-sivuston takana.

Nykyään näkee nopeutta vaativissa projekteissa Apachen tilalla Litespeed-palvelimen ja MySQL:n tilalla MariaDB:n, mutta teknisesti toimintaperiaate on sama. Kun käyttäjä avaa verkkosivuston, lähettää selain palvelimelle pyynnön saada verkkosivuston sisällön. Palvelinohjelmisto käsittelee pyynnön, ja ohjelmointikieli hakee käyttäjän pyytämät tiedot tietokannasta. Sen jälkeen ohjelmointikieli rakentaa käyttäjälle tämän pyynnön mukaisen HTML-verkkosivuston ja palvelinohjelmisto lähettää sen käyttäjälle tarpeellisten resurssien, kuten sivun kuvatiedostojen, kera.

Periaatte on siis se, että palvelin rakentaa sivuston uudelleen joka kerta kun käyttäjä klikkaa sivustolla linkkiä jokaiselle käyttäjälle erikseen. Tämä vaatii palvelimelta paljon tehoa kun käyttäjämäärät kasvavat. Tämä käyttäjäkohtainen sivuston uudelleenrakentaminen voi johtaa myös palvelimen ylikuormitukseen estäen sivuston tai kaupan käytön kaikilta suurten kävijäryntäysten aikana, olipa niiden takana sitten oikeat asiakkaat tai palvelunestohyökkäys. Ja jos palvelin kestäisikin hyvällä välimuistituksella ja kuormanjaolla kävijäryntäyksen, tietokantasovellus puolestaan saattaa ylikuormittua ja estää sivuston tai kaupan käytön kaikilta.