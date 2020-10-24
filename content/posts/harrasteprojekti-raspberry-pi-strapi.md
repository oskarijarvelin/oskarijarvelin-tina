---
title: 'Harrasteprojekti: Raspberry Pi & Strapi'
date: '2020-10-24T19:05:37.122Z'
type: post
path: /blogi/harrasteprojekti-raspberry-pi-strapi
draft: true
hero:
  image: ../images/earth.jpg
---
_<Intro>_Vuosi sitten ei olisi tarvinnut keksiä tekemistä viikonloppuisin. Heinäkuusta lähtien koko loppuvuoden viikonloput olivat täynnä tapahtumia ja konsertteja. Koronapandemian hyviä puolia ovat rauhalliset viikonloput, kun ehtii harrastaa ja työstää pöytälaatikkoprojekteja. Yksi emoprojekti on lojunut pöytälaatikossa käyttämättä pian jo pari vuotta: **Raspberry Pi 3 Model B** eli _raspi_. Kyseessä on luottokortin kokoinen tietokone, joka mahdollistaa monenlaisten projektien kehittämisen verkkopalveluista IoT:hen.

Ennen pöytälaatikkoon joutumista raspi majoitti Drupal-sivuston uudistusprojektin kehitysversiota. Perinteisemmät sisällönhallintajärjestelmät ovat tuttuja jo ennestään, joten päädin kokeilla perustaa hotellin nuoremmille järjestelmille. Ensimmäisenä piinapenkkiin päätyi useammassa työprojektissa käytössä oleva **Strapi** - avoimen lähdekoodin Headless CMS. Dokumentoin tähän artikkeliin Strapin pystytysprosessin vaiheet komento komennolta sekä kohtaamani sudenkuopat._</Intro>_

## Asennus & kovennukset

Aloitin projektin tyhjältä pöydältä. Asensin tyhjälle 64gb Class 10:n microSD-kortille [Raspberry Pi OS (32-bit) Liten](https://www.raspberrypi.org/downloads/raspberry-pi-os/). Seurasin valmistajan ohjeita raspin [tietoturvakovennuksiin](https://www.raspberrypi.org/documentation/configuration/security.md). Ensimmäisenä vaihdoin luonnollisesti käyttäjätunnuksen ja salasanan laitteelle.

    sudo raspi-config

Aukeavalla työkalulla voi vaihtaa mm. salasanan, avata SSH-yhteyden laitteelle ja muuttaa näppäimistön kieltä.

    sudo adduser <oskari>
    sudo usermod -a -G adm,dialout,cdrom,sudo,audio,video,plugdev,games,users,input,netdev,gpio,i2c,spi <oskari>
    sudo pkill -u pi
    sudo deluser pi
    sudo deluser -remove-home pi

Kun käyttäjänimi ja salasana olivat turvalliset, muutin sudo-komennon vaatimaan aina salasanaa.

    sudo visudo /etc/sudoers.d/010_pi-nopasswd
    <oskari> ALL=(ALL) PASSWD: ALL

Tärkeä turva laitteelle on myös turhan ja vaarallisen liikenteen estäminen. Asensin UFW-palomuurin ja sallin ainoastaan portit 22 (SSH), 80 (HTTP) ja 443 (HTTPS). Koska raspi tulee olemaan auki nettiin, haluan estää myös brute-force hyökkäykset laitettani vastaan Fail2ban-skannerilla.

    sudo apt install ufw
    sudo ufw enable
    sudo ufw enable 22
    sudo ufw enable 80
    sudo ufw enable 443
    sudo apt install fail2ban
    sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local

### Suodenkuopat

Alkuun en avannut palomuuriin porttia 443, koska en asentanut heti SSL-sertifikaattia. Kun ohjasin alidomainin raspiin ja asensin alidomainille SSL-sertifikaation, en tiennyt sen pakottavan liikenteen porttiin 443 myös http-osoitteilla. Koska testisivu toimi suoralla IP-osoitteella mutta ei alidomainilla, luulin vian olevan palvelimen asetuksissa. Etsin ongelmaa luvattoman pitkään, ennen kuin älysin tarkistaa palomuurin ja huomasin unohtaneeni avata portin 443.

Reitittimestä kannattaa muistaa myös ohjata kaikkien kolmen portin (22, 80 ja 443) liikenne menemään raspille.

## Palvelin ja SSL-salaus

