import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import User from '../models/user';
import ZahtevRegistr from '../models/zahtZaRegistr';
import ZahteviZaPostPregl from '../models/zahteviZaPostPregl';
import PostojePregledi from '../models/postojepregledi';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-menadzer',
  templateUrl: './menadzer.component.html',
  styleUrls: ['./menadzer.component.css']
})
export class MenadzerComponent implements OnInit {

  constructor(private router: Router, private userService: UserService,private http: HttpClient) { }

  korisnik: User;
  pacijenti:User[]=[]
  lekari:User[]=[]
  zahteviRegistr:ZahtevRegistr[]=[]
  zahteviZaPostPregl:ZahteviZaPostPregl[]=[]
  sviPostojePregledi:PostojePregledi[]=[]

  ngOnInit(): void {
    this.userService.getUser(sessionStorage.getItem("ulogovan")).subscribe((u1: User) => {
      if (u1==null) this.router.navigate([''])
      this.korisnik = u1;
      if (this.korisnik.tip!=='menadzer') this.router.navigate([''])
    })
    this.userService.dohvatiKorisnikePoTipu("pacijent").subscribe((u2: User[]) => {
      this.pacijenti = u2;
    })
    this.userService.dohvatiKorisnikePoTipu("lekar").subscribe((u3: User[]) => {
      this.lekari = u3;
    })
    this.userService.dohvSveZahteveRegist().subscribe((u4: ZahtevRegistr[]) => {
      this.zahteviRegistr = u4;
    })
    this.userService.dohvSveZahteveZaPostPregl().subscribe((u5: ZahteviZaPostPregl[]) => {
      this.zahteviZaPostPregl = u5;
    })
    this.userService.dohvSvePostojePregledi().subscribe((u6: PostojePregledi[]) => {
      this.sviPostojePregledi = u6;
    })
  }


  ime: string="";
  prezime: string="";
  adresa: string="";
  telefon: string="";
  email: string="";

  brleklic: string="";
  spec: string="";
  ogranak: string="";


  obrisi1(korisnickoIme:string){
    this.userService.obrisiKorisnika(korisnickoIme).subscribe(res => {
     location.reload();
    })
  }

  azuriraj1(korisnickoIme:string){
    this.userService.updatePacijenta(korisnickoIme,this.ime,this.prezime,this.adresa,this.telefon,this.email).subscribe(res => {
      location.reload();
     })
  }


  obrisi2(korisnickoIme:string){
    this.userService.obrisiKorisnika(korisnickoIme).subscribe(res => {
      location.reload();
     })
  }

  azuriraj2(korisnickoIme:string){
    this.userService.updateLekara(korisnickoIme,this.ime,this.prezime,this.adresa,this.telefon,this.email,this.brleklic,this.spec,this.ogranak).subscribe(res => {
      location.reload();
     })
  }

  novlekarkorisnickoIme: string="";
  novlekarlozinka: string="";
  novlekarime: string="";
  novlekarprezime: string="";
  novlekaradresa: string="";
  novlekarkontaktTelefon: string="";
  novlekaremail: string="";
  novlekarbrLekarskeLic: string="";
  novlekarspecijalizacija: string="";
  novlekarogranakOrdinac: string="";
  tip: string="lekar";
  

  dodLekara(){

    if(this.novlekarkorisnickoIme!="" && this.novlekarlozinka!="" && this.novlekarime!="" && this.novlekarprezime!="" && this.novlekaradresa!="" && this.novlekarkontaktTelefon!="" && this.novlekaremail && this.novlekarbrLekarskeLic!="" && this.novlekarspecijalizacija!="" && this.novlekarogranakOrdinac!="" && this.imageok){
    


      let putDoSlike=""
      if (this.images == undefined) putDoSlike="http://localhost:4000/uploads/Frog.jpg";
    else {
      const randomNum = Math.floor(10000 + Math.random() * 90000);
      const novoImeSlike ="slika_" + randomNum + ".jpg";
      putDoSlike="http://localhost:4000/uploads/"+novoImeSlike;

      const formData = new FormData();
      formData.append('file',this.images, novoImeSlike)
      this.http.post<any>('http://localhost:4000/file', formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
      
    }
    // ovdeeeeee
    
      this.userService.dodajLekara(this.novlekarkorisnickoIme,this.novlekarlozinka,this.novlekarime,this.novlekarprezime,this.novlekaradresa,this.novlekarkontaktTelefon,this.novlekaremail,this.novlekarbrLekarskeLic,this.novlekarspecijalizacija,this.novlekarogranakOrdinac,this.tip,putDoSlike).subscribe(res => {
      location.reload();
     })
    }
  }

/////////////////////////////////////////////


  images=undefined;
  errorIMAGE:string="dobicete default sliku"
  imageok:boolean=true;

selectImage(event) {
  if (event.target.files.length == 1){ // bilo >0
    const file = event.target.files[0];
    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(img.src);

      const minWidth = 100;
      const maxWidth = 300;
      const minHeight = 100;
      const maxHeight = 300;

      if (
        img.width >= minWidth && img.width <= maxWidth &&
        img.height >= minHeight && img.height <= maxHeight
      ) {
        this.images = file;
        this.errorIMAGE='ok velicina';
        this.imageok=true;
      } else {
        this.errorIMAGE='Veličina slike nije u dozvoljenom rasponu (100x100 - 300x300).';
        this.images = undefined; // Resetujemo selektovanu sliku
        this.imageok=false;
      }
    };
  }
  else if(event.target.files.length == 0){
    this.imageok=true;
    this.images = undefined
    this.errorIMAGE='dobicete default sliku';
  }
} 




















///////////////////////////////////////////////

  

  obrisiRegZahtev(korisnickoIme:string,email:string){
    this.userService.obrisiZahtevRegistr(korisnickoIme,email).subscribe(res => {
      // ubaci u zabranjene korisnickoIme,email
      this.userService.ubaciUZabranjene(korisnickoIme,email).subscribe(res => {     
        location.reload();
       })
     })
  }

  odobriRegZahtev(korisnickoIme:string,lozinka:string,ime:string,prezime:string,adresa:string,kontaktTelefon:string,email:string,slika:string){
    this.userService.obrisiZahtevRegistr(korisnickoIme,email).subscribe(res => {
      // ubaci u zabranjene korisnickoIme,email
      this.userService.ubaciUKorisnike(korisnickoIme,lozinka,ime,prezime,adresa,kontaktTelefon,email,slika).subscribe(res => {     
        location.reload();
       })
     })

  }


  potvrdiZZPP(naziv:string,trajanje:number,cena:number,specijalizacija:string){
    this.userService.deleteZZPP(naziv,trajanje,cena,specijalizacija).subscribe(res => {
      
      this.userService.putPostPreg(naziv,trajanje,cena,specijalizacija).subscribe(res => {
      
        location.reload();
      })

    })
  }

  odbijZZPP(naziv:string,trajanje:number,cena:number,specijalizacija:string){
    this.userService.deleteZZPP(naziv,trajanje,cena,specijalizacija).subscribe(res => {
      location.reload();
    })
  }


  novpregnaziv: string="";
  novpregtraj: number=0;
  novpregcena: number=0;
  novpregspec: string="";

  dodNovPreg(){
    if(this.novpregnaziv!="" && this.novpregtraj>0 && this.novpregcena>0 && this.novpregspec!=""){
      this.userService.dodNovPostPreg(this.novpregnaziv,this.novpregtraj,this.novpregcena,this.novpregspec).subscribe(res => {
        location.reload();
      })
    }
  }

  procitNaziv: string="";
  procitCena: number=0;

  updtNaz(naziv:string,trajanje:number,cena:number,specijalizacija:string){
    if(this.procitNaziv!=""){
    this.userService.updtNaz(naziv,trajanje,cena,specijalizacija,this.procitNaziv).subscribe(res => {
      location.reload();
    })
  }
  }

  updtCena(naziv:string,trajanje:number,cena:number,specijalizacija:string){
    if(this.procitCena>0){
      this.userService.updtCena(naziv,trajanje,cena,specijalizacija,this.procitCena).subscribe(res => {
        location.reload();
      })
    }
  }

  dlt(naziv:string,trajanje:number,cena:number,specijalizacija:string){
    this.userService.dlt(naziv,trajanje,cena,specijalizacija).subscribe(res => {
      location.reload();
    })
  }




  logout() {
    sessionStorage.removeItem("lekar")
    sessionStorage.removeItem("ulogovan")
    sessionStorage.removeItem("pacijent")
    this.router.navigate([''])
  }

  promeniLozinku(){
    this.router.navigate(['promLozinke'])
  }





}
