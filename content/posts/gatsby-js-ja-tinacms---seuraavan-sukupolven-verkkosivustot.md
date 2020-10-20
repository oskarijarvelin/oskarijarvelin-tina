---
title: Gatsby.js ja TinaCMS - Seuraavan sukupolven verkkosivustot
date: '2020-10-18T09:28:03.649Z'
type: post
path: /blogi/gatsby-js-ja-tinacms-seuraavan-sukupolven-verkkosivustot
draft: false
hero:
  image: ../images/laptop-3174729_1920.jpg
---
Uskallan väittää että verkkosivustoni on toteutettu uusimmilla web-teknologioilla, vaikka uusia teknologioita ja JavaScript-kirjastoja syntyy webin uumenissa päivittäin. Sivustoni on nimittäin toteutettu kaksi vuotta vanhalla _React_-pohjaisella **Gatsby.js** -frameworkillä ja vuoden vanhalla **TinaCMS** -sisältöeditorilla.

Pyrin avaamaan tässä artikkelissa aluksi yleisesti valitsemieni teknologioiden hyötyjä ja heikkouksia yleistajuisemmin syventyen loppua kohden teknisimpiin yksityiskohtiin.

## Nykysukupolven verkkosivuteknologiat

Valtaosa verkkosivustoista rakentuu niin kutsutulle **LAMP**-stackin päälle. Stackilla tarkoitetaan tässä yhteydessä sellaista ohjelmistokokoelmaa, joilla verkkosivusto saadaan toimimaan. Termi tulee sanoista **Linux** (palvelimen käyttöjärjestelmä), **Apache** (palvelinohjelmisto), **MySQL** (tietokantaohjelmisto) ja **PHP** (ohjelmointikieli). Tämä stack on mm. jokaisen WordPress-sivuston takana.

Nykyään näkee nopeutta vaativissa projekteissa Apachen tilalla Litespeed-palvelimen ja MySQL:n tilalla MariaDB:n, mutta teknisesti toimintaperiaate on sama. Kun käyttäjä avaa verkkosivuston, lähettää selain palvelimelle pyynnön saada verkkosivuston sisällön. Palvelinohjelmisto käsittelee pyynnön, ja ohjelmointikieli hakee käyttäjän pyytämät tiedot tietokannasta. Sen jälkeen ohjelmointikieli rakentaa käyttäjälle tämän pyynnön mukaisen HTML-sivun ja palvelinohjelmisto lähettää sen käyttäjälle tarpeellisten resurssien, kuten sivun kuvatiedostojen, kera.

Periaate on siis se, että palvelin rakentaa sivuston uudelleen joka kerta kun käyttäjä klikkaa sivustolla linkkiä jokaiselle käyttäjälle erikseen. Tämä vaatii palvelimelta paljon tehoa kun käyttäjämäärät kasvavat. Tämä käyttäjäkohtainen sivuston uudelleenrakentaminen voi johtaa myös palvelimen ylikuormitukseen estäen sivuston tai kaupan käytön kaikilta suurten kävijäryntäysten aikana, olipa niiden takana sitten oikeat asiakkaat tai palvelunestohyökkäys. Ja jos palvelin kestäisikin hyvällä välimuistituksella ja kuormanjaolla kävijäryntäyksen, tietokantasovellus puolestaan saattaa ylikuormittua ja estää sivuston tai kaupan käytön kaikilta.

Kun sivusto rakennetaan palvelimen toimesta käyttäjän pyyntöjen mukaisesti, syntyy myös automaattisesti hyökkäysmahdollisuus käyttäen haitallisia pyyntöjä. Jos haitallisia pyyntöjä ei ole tapauskohtaisesti suodatettu, tällöin palvelinta voidaan manipuloida tekemään jotakin potentiaalisesti haitallista, kuten pahimmissa tapauksissa keertomaan verkkokaupan asiakkaiden maksukorttien tiedot tai salasanat. Hyökkäyspinta-alaa jää erityisesti sellaisille haitallisille pyynnöille, joita kukaan ei ole koskaan aiemmin löytänyt, käyttänyt ja osannut estää. Tällaisia tuntemattomia uhkia kutsutaan **nollapäivähaavoittuvuuksiksi**.

## Jamstack - Seuraava sukupolvi

Oman sivustoni olen rakentanut puolestaan **Jamstackin** päälle, joka ei terminä ole akronyymi kuten LAMP. Tekniikan erikoisuus on että sivusto rakennetaan valmiiksi staattisiksi HTML-sivuiksi, jotka jaellaan käyttäjälle sisällönjakeluverkosta. Dynaaminen sisältö haetaan vasta käyttäjän selaimessa sovellusrajapinnasta ja sijoitetaan staattiseen sivuun.

### Jamstackin edut: Nopeus

Jamstackin suurin hyöty on nopeus. Sivusto ei tarvitse käyttäjän toimintoihin reagoivaa palvelinta rakentamaan sivustoa jokaiselle käyttäjälle uudelleen, vaan sivusto rakennetaan kerran valmiiksi HTML-sivuiksi. HTML-sivut taas voidaan siirtää ja hajauttaa ympäri sisällönjakeluverkkoa, josta jokainen kävijä saa ladattua ne nopeasti.

### Jamstackin edut: Turvallisuus

Tekniikka on myös turvallinen. Ei tarvita palvelinta joka voisi ylikuormittua, joten sivusto kestää paremmin kävijäryntäykset ja on immuuni palvelunestohyökkäyksille. Ilman palvelinta myös palvelimelle tarkoitetut haitalliset komennot rakennuspyyntöjen seassa ovat hyödyttömiä koska sivusto on rakennettu ennalta valmiiksi turvallisesti. Sivustolla ei ole hyökkäyspinta-alaa itsessään käytännössä ollenkaan ja on turvassa jopa nollapäivähaavoittuvuuksilta.

Käytännössä sisällönjakeluverkolla on toki rajansa kävijämäärien kanssa, sillä niiden hinnoittelu perustuu yleensä kävijämääriin ja jos sivusto hakee jotain sisältöä, kuten esimerkiksi kaupan tuotteet, rajapinnan yli sisällönhallintajärjestelmästä, on sisällönhallintajärjestelmän palvelin yhä haavoittuvainen palvelunestohyökkäyksille ja haitallisille pyynnöille. Sivuston eli frontendin ja sisällönhallintajärjestelmän eli backendin erottaminen toisistaan on kuitenkin hyvä käytäntö tietoturvan kannalta.

### Jamstackin edut: Versionhallinta

Kaikki Jamstack-sivustossa elää Git-versionhallinnassa, jolloin kehitystä on erittäin helppoa ja luontevaa tehdä tiimissä ja projektista on sen koko historia jokaisen kehittäjän saatavilla. Sivusto rakentuu automaattisesti uudestaan kun versionhallinnan kautta tulee muutoksia. Versionhallinta mahdollistaa myös rinnakkaisten versioiden tekemisen, esimerkiksi kehitystä tai A/B-testausta varten.