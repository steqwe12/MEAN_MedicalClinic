import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  uri = "http://localhost:4000/user";

  login(korisnickoIme: string, lozinka: string) {
    let data = {
      korisnickoIme: korisnickoIme, lozinka: lozinka
    }
    return this.http.post(`${this.uri}/login`, data)
  }

  getUser(korisnickoIme: string) {
    let data = {
      korisnickoIme: korisnickoIme
    }
    return this.http.post(`${this.uri}/getUser`, data)
  }

  dohvatiKorisnikePoTipu(tip: string) {
    let data = {
      tip: tip
    }
    return this.http.post(`${this.uri}/dohvatiKorisnikePoTipu`, data)
  }

  promeniLozinku(korisnickoIme:string, novaLozinka:string){
    let data = {
      korisnickoIme: korisnickoIme, novaLozinka:novaLozinka
    }
    return this.http.post(`${this.uri}/promeniLozinku`, data)
  }

  dohvatiKorisnikeZaUsername(korisnickoIme:string){
    let data = {
      korisnickoIme: korisnickoIme
    }
    return this.http.post(`${this.uri}/dohvatiKorisnikeZaUsername`, data)
  }

  dohvatiKorisnikeZaEmail(email:string){
    let data = {
      email: email
    }
    return this.http.post(`${this.uri}/dohvatiKorisnikeZaEmail`, data)
  }

  registruj(korisnickoIme:string, lozinka:string, ime:string, prezime:string, adresa:string, kontaktTelefon:string, email:string, slika:string){
    let data = {
      korisnickoIme: korisnickoIme, 
      lozinka: lozinka,
      ime: ime,
      prezime: prezime,
      adresa: adresa,
      kontaktTelefon: kontaktTelefon,
      email: email,
      slika: slika,
    }
    return this.http.post(`${this.uri}/registruj`, data)
  }

  getVrstePregleda(lekar:string){
    let data = {
      lekar: lekar,    
    }
    return this.http.post(`${this.uri}/getVrstePregleda`, data)
  }

  getZakazanePreglede(lekar:string){
    let data = {
      lekar: lekar,    
    }
    return this.http.post(`${this.uri}/getZakazanePreglede`, data)
  }

  zakaziPregled(lekar:string, naziv:string, trajanje:number, cena:number, vremeod:string, vremedo:string, pacijent:string){
    let data = {
      lekar: lekar,
      naziv: naziv,
      trajanje: trajanje,
      cena: cena,
      vremeod: vremeod,
      vremedo: vremedo,
      pacijent: pacijent,    
    }
    return this.http.post(`${this.uri}/zakaziPregled`, data)
  }

  dohvatiIzvestaje(pacijent:string){
    let data = {
      pacijent: pacijent   
    }
    return this.http.post(`${this.uri}/dohvatiIzvestaje`, data)
  }


  dohvatiZakPreglede(pacijent:string){
    let data = {
      pacijent: pacijent   
    }
    return this.http.post(`${this.uri}/dohvatiZakPreglede`, data)
  }

  dohvatiSveLekare(tip:string){
    let data = {
      tip: tip   
    }
    return this.http.post(`${this.uri}/dohvatiSveLekare`, data)
  }

  otkaziPregled(lekar:string,vremeod:string){
    let data = {
      lekar: lekar,
      vremeod:vremeod
    }
    return this.http.post(`${this.uri}/otkaziPregled`, data)
  }

  getSvePostojePreglediZaSpec(specijalizacija:string){
    let data = {
      specijalizacija: specijalizacija
    }
    return this.http.post(`${this.uri}/getSvePostojePreglediZaSpec`, data)
  }

  getSveObavljaPregledeZaIme(korisnickoIme:string){
    let data = {
      korisnickoIme: korisnickoIme
    }
    return this.http.post(`${this.uri}/getSveObavljaPregledeZaIme`, data)
  }

  dodajUObavljaPreglede(korisnickoIme:string,naziv:string,trajanje:number,cena:number){
    let data = {
      korisnickoIme: korisnickoIme,
      naziv:naziv,
      trajanje:trajanje,
      cena:cena
    }
    return this.http.post(`${this.uri}/dodajUObavljaPreglede`, data)
  }

  getZakPregZaPacLek(lekar:string,pacijent:string){
    let data = {
      lekar: lekar,
      pacijent:pacijent
    }
    return this.http.post(`${this.uri}/getZakPregZaPacLek`, data)
  }

  unesiIzvestaj(lekar:string,pacijent:string,vremeod:string,vremedo:string,specijalizacija:string,razlogDolaska:string,dijagnoza:string,terapija:string,kontrola:string){
    let data = {
      lekar: lekar,
      pacijent:pacijent,
      vremeod: vremeod,
      vremedo: vremedo,
      specijalizacija: specijalizacija,
      razlogDolaska: razlogDolaska,
      dijagnoza: dijagnoza,
      terapija: terapija,
      kontrola: kontrola
    }
    return this.http.post(`${this.uri}/unesiIzvestaj`, data)
  }

  proslediZahtev(naziv:string,trajanje:number,cena:number,specijalizacija:string){
    let data = {
      naziv: naziv,
      trajanje:trajanje,
      cena: cena,
      specijalizacija: specijalizacija
    }
    return this.http.post(`${this.uri}/proslediZahtev`, data)
  }

  obrisiKorisnika(korisnickoIme:string){
    let data = {
      korisnickoIme: korisnickoIme
    }
    return this.http.post(`${this.uri}/obrisiKorisnika`, data)
  }

  updatePacijenta(korisnickoIme:string,ime:string,prezime:string,adresa:string,telefon:string,email:string){
    let data = {
      korisnickoIme: korisnickoIme,
      ime: ime,
      prezime: prezime,
      adresa: adresa,
      telefon: telefon,
      email: email,
    }
    return this.http.post(`${this.uri}/updatePacijenta`, data)
  }

  updateLekara(korisnickoIme:string,ime:string,prezime:string,adresa:string,telefon:string,email:string,brleklic:string,spec:string,ogranak:string){
    let data = {
      korisnickoIme: korisnickoIme,
      ime: ime,
      prezime: prezime,
      adresa: adresa,
      telefon: telefon,
      email: email,
      brleklic: brleklic,
      spec: spec,
      ogranak: ogranak
    }
    return this.http.post(`${this.uri}/updateLekara`, data)
  }

  dodajLekara(korisnickoIme:string,lozinka:string,ime:string,prezime:string,adresa:string,kontaktTelefon:string,email:string,brLekarskeLic:string,specijalizacija:string,ogranakOrdinac:string,tip:string,slika:string){
    let data = {
      korisnickoIme: korisnickoIme,
      lozinka: lozinka,
      ime: ime,
      prezime: prezime,
      adresa: adresa,
      kontaktTelefon: kontaktTelefon,
      email: email,
      brLekarskeLic: brLekarskeLic,
      specijalizacija: specijalizacija,
      ogranakOrdinac: ogranakOrdinac,
      tip: tip,
      slika:slika
    }
    return this.http.post(`${this.uri}/dodajLekara`, data)
  }

  dohvSveZahteveRegist(){
    let data = {
      
    }
    return this.http.post(`${this.uri}/dohvSveZahteveRegist`, data)
  }

  obrisiZahtevRegistr(korisnickoIme:string,email:string){
    let data = {
      korisnickoIme: korisnickoIme,
      email:email
    }
    return this.http.post(`${this.uri}/obrisiZahtevRegistr`, data)
  }

  ubaciUZabranjene(korisnickoIme:string,email:string){
    let data = {
      korisnickoIme: korisnickoIme,
      email:email
    }
    return this.http.post(`${this.uri}/ubaciUZabranjene`, data)
  }

  ubaciUKorisnike(korisnickoIme:string,lozinka:string,ime:string,prezime:string,adresa:string,kontaktTelefon:string,email:string,slika:string){
    let data = {
      korisnickoIme: korisnickoIme,
      lozinka:lozinka,
      ime:ime,
      prezime:prezime,
      adresa:adresa,
      kontaktTelefon:kontaktTelefon,
      email:email,
      slika:slika
    }
    return this.http.post(`${this.uri}/ubaciUKorisnike`, data)
  }

  dohvSveZahteveZaPostPregl(){
    let data = {
      
    }
    return this.http.post(`${this.uri}/dohvSveZahteveZaPostPregl`, data)
  }

  deleteZZPP(naziv:string,trajanje:number,cena:number,specijalizacija:string){
    let data = {
      naziv: naziv,
      trajanje:trajanje,
      cena:cena,
      specijalizacija:specijalizacija
    }
    return this.http.post(`${this.uri}/deleteZZPP`, data)
  }

  putPostPreg(naziv:string,trajanje:number,cena:number,specijalizacija:string){
    let data = {
      naziv: naziv,
      trajanje:trajanje,
      cena:cena,
      specijalizacija:specijalizacija
    }
    return this.http.post(`${this.uri}/putPostPreg`, data)
  }

  dohvSvePostojePregledi(){
    let data = {
      
    }
    return this.http.post(`${this.uri}/dohvSvePostojePregledi`, data)
  }
  
  dodNovPostPreg(naziv:string,trajanje:number,cena:number,specijalizacija:string){
    let data = {
      naziv: naziv,
      trajanje:trajanje,
      cena:cena,
      specijalizacija:specijalizacija
    }
    return this.http.post(`${this.uri}/dodNovPostPreg`, data)
  }

  dlt(naziv:string,trajanje:number,cena:number,specijalizacija:string){
    let data = {
      naziv: naziv,
      trajanje:trajanje,
      cena:cena,
      specijalizacija:specijalizacija
    }
    return this.http.post(`${this.uri}/dlt`, data)
    }

    updtNaz(naziv:string,trajanje:number,cena:number,specijalizacija:string,procitNaziv:string){
      let data = {
        naziv: naziv,
        trajanje:trajanje,
        cena:cena,
        specijalizacija:specijalizacija,
        procitNaziv:procitNaziv
      }
      return this.http.post(`${this.uri}/updtNaz`, data)
    }

    updtCena(naziv:string,trajanje:number,cena:number,specijalizacija:string,procitCena:number){
      let data = {
        naziv: naziv,
        trajanje:trajanje,
        cena:cena,
        specijalizacija:specijalizacija,
        procitCena:procitCena
      }
      return this.http.post(`${this.uri}/updtCena`, data)
    }

    dohvatiSveZabranjene(){
      let data = {
        
      }
      return this.http.post(`${this.uri}/dohvatiSveZabranjene`, data)
    }

}