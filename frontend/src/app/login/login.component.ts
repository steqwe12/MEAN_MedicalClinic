import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import User from '../models/user';
import { HttpClient } from '@angular/common/http';
import Zabranjeni from '../models/zabranjeni';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private userService: UserService, private http: HttpClient) { }

  trenSlika="../../assets/s_1.jpg"
  i:number=1;

  levo(){
    this.i=(this.i-1)%5;
    if (this.i==-1) this.i=4;
    this.trenSlika="../../assets/s_"+this.i+".jpg"
  }

  desno(){
    this.i=(this.i+1)%5;
    this.trenSlika="../../assets/s_"+this.i+".jpg"
  }

  usernameLogin: string = "";
  passwordLogin: string = "";
  errorLogin: string;

  usernameReg: string = "";
  passwordReg: string = "";
  passwordRegConf: string = "";
  nameReg: string = "";
  secnameReg: string = "";
  adrReg: string = "";
  phoneReg: string = "";
  emailReg: string = "";
  
  
  errorPassword: string;
  errorPasswordConf: string;
  errorUsername:string;
  errorName:string;
  errorSecname:string;
  errorPhone:string;
  errorEmail:string;

  sviLekari: User[] = []
  sviLekariMENJANI: User[] = []
  filterIme:string='';
  filterPrezime:string='';
  filterSpec:string='';

  filtrLekare(){
    this.sviLekariMENJANI=this.sviLekari;
    if (this.filterIme!="")
    this.sviLekariMENJANI=this.sviLekariMENJANI.filter(lekar=>lekar.ime.includes(this.filterIme));
    if (this.filterPrezime!="")
    this.sviLekariMENJANI=this.sviLekariMENJANI.filter(lekar=>lekar.prezime.includes(this.filterPrezime));
    if (this.filterSpec!="")
    this.sviLekariMENJANI=this.sviLekariMENJANI.filter(lekar=>lekar.specijalizacija.includes(this.filterSpec));
  }

  sortDesc1() {
    this.sviLekariMENJANI.sort((writer1, writer2) => {
      if (writer1.ime < writer2.ime) {
        return -1;
      }
      else {
        if (writer1.ime == writer2.ime) {
          return 0;
        }
        else return 1;
      }
    })
  }

  sortAsc1() {
    this.sviLekariMENJANI.sort((writer1, writer2) => {
      if (writer1.ime > writer2.ime) {
        return -1;
      }
      else {
        if (writer1.ime == writer2.ime) {
          return 0;
        }
        else return 1;
      }
    })
  }

  sortDesc2() {
    this.sviLekariMENJANI.sort((writer1, writer2) => {
      if (writer1.prezime < writer2.prezime) {
        return -1;
      }
      else {
        if (writer1.prezime == writer2.prezime) {
          return 0;
        }
        else return 1;
      }
    })
  }

  sortAsc2() {
    this.sviLekariMENJANI.sort((writer1, writer2) => {
      if (writer1.prezime > writer2.prezime) {
        return -1;
      }
      else {
        if (writer1.prezime == writer2.prezime) {
          return 0;
        }
        else return 1;
      }
    })
  }

  sortDesc3() {
    this.sviLekariMENJANI.sort((writer1, writer2) => {
      if (writer1.specijalizacija < writer2.specijalizacija) {
        return -1;
      }
      else {
        if (writer1.specijalizacija == writer2.specijalizacija) {
          return 0;
        }
        else return 1;
      }
    })
  }

  sortAsc3() {
    this.sviLekariMENJANI.sort((writer1, writer2) => {
      if (writer1.specijalizacija > writer2.specijalizacija) {
        return -1;
      }
      else {
        if (writer1.specijalizacija == writer2.specijalizacija) {
          return 0;
        }
        else return 1;
      }
    })
  }

  sviZabranjeni:Zabranjeni[]=[]

  ngOnInit(): void {
    this.userService.dohvatiKorisnikePoTipu("lekar").subscribe((lekari: User[])=>{
      this.sviLekari=lekari;
      this.sviLekariMENJANI=lekari;
    })

    this.userService.dohvatiSveZabranjene().subscribe((zabr: Zabranjeni[])=>{
      this.sviZabranjeni=zabr;
    })
    
  }


  login() {
    if (this.usernameLogin == "" || this.passwordLogin == "") {
      this.errorLogin = "Niste uneli sve podatke!";
      return;
    }
    this.errorLogin = "";
    this.userService.login(this.usernameLogin, this.passwordLogin).subscribe((k: User) => {
      if (k) {

        if (k.tip=="menadzer") {
          this.errorLogin = "Ulogujte se na adekvatan nacin";
          return;
        }

        sessionStorage.setItem("ulogovan", k.korisnickoIme)
        this.router.navigate([k.tip])
      } else {
        this.errorLogin = "Losi podaci!";
        return;
      }
    })
  }


  
  lozinkaok:boolean=false;

  proveriLozinku(){
   let regex0= /^[^\s]{8,14}$/
   let regex1= /^[a-zA-Z].{7,13}$/
   let regex2= /[A-Z]/
   let regex3= /[0-9]/
   let regex4= /[!@#$%^&*.]/
   let regex5= /^(?:(.)(?!\1))*$/

    let tst0=this.passwordReg.match(regex0);
    let tst1=this.passwordReg.match(regex1);
    let tst2=this.passwordReg.match(regex2);
    let tst3=this.passwordReg.match(regex3);
    let tst4=this.passwordReg.match(regex4);
    let tst5=this.passwordReg.match(regex5);

    if (!tst1 || !tst2 || !tst3 || !tst4 || !tst5 || !tst0) {this.errorPassword="pogresan format lozinke"; this.lozinkaok=false;}
    else {this.errorPassword="dobar format lozinke"; this.lozinkaok=true;}
  }

  lozinkaconfok:boolean=false;
  proveriLozinkuConf(){
    if (this.passwordRegConf===this.passwordReg) {this.errorPasswordConf="lozinke se podudaraju"; this.lozinkaconfok=true;}
    else { this.errorPasswordConf="lozinke se ne podudaraju"; this.lozinkaconfok=false;}
  }

  korimeok:boolean=false;
  proveriKorIme(){
    let regex1 = /^[a-zA-Z][a-zA-Z0-9_]{3,19}$/

    let tst0=this.usernameReg.match(regex1);
    if(!tst0) {this.errorUsername="pogresan format kor imena"; this.korimeok=false;}
    else{ this.errorUsername="dobar format kor imena"; this.korimeok=true;}
    // jos fali da proverim iz baze da li je jedinstveno

    this.userService.dohvatiKorisnikeZaUsername(this.usernameReg).subscribe((korisnici: User[])=>{
    
      korisnici.forEach(kor => {
        this.korimeok=false;
        this.errorUsername+=" , korisnik vec postoji";
      });

      this.sviZabranjeni.forEach(zabr => {
        if(this.usernameReg==zabr.korisnickoIme){
          this.korimeok=false;
          this.errorUsername+=" , zabranjeno!";
        }
      });

    })
  }

  imeok:boolean=false;
  proveriIme(){
    let regex1 = /^[a-zA-Z]{1,30}$/

    let tst0=this.nameReg.match(regex1);
    if(!tst0) {this.errorName="pogresan format imena";this.imeok=false;}
    else {this.errorName="dobar format imena"; this.imeok=true;}
  }

  prezimeok:boolean=false;
  proveriPrezime(){
    let regex1 = /^[a-zA-Z]{1,30}$/

    let tst0=this.secnameReg.match(regex1);
    if(!tst0) {this.errorSecname="pogresan format prezimena"; this.prezimeok=false;}
    else {this.errorSecname="dobar format prezimena"; this.prezimeok=true;}
  }

  telefonok:boolean=false;
  proveriTelefon(){
    let regex1 = /^[\+][0-9]{8,16}$/
    let regex2 = /^[0-9]{6,14}$/

    let tst0=this.phoneReg.match(regex1);
    let tst1=this.phoneReg.match(regex2);
    if(!tst0 && !tst1) {this.errorPhone="pogresan format telefona"; this.telefonok=false;}
    else {this.errorPhone="dobar format telefona"; this.telefonok=true;}
  }

  emailok:boolean=false;
  proveriEmail(){
    let regex1 = /^[^\s]{6,30}[@][a-z]{3,10}[.][a-z]{2,6}$/
    let regex2 = /^[a-zA-Z].{5,29}[@][a-z]{3,10}[.][a-z]{2,6}$/
    let regex3 = /^[a-zA-Z1-9.]{5,29}[a-zA-Z1-9][@][a-z]{3,10}[.][a-z]{2,6}$/
    

    let tst0=this.emailReg.match(regex1);
    let tst1=this.emailReg.match(regex2);
    let tst2=this.emailReg.match(regex3);
    if(!tst1 || !tst2 || !tst0) {this.errorEmail="pogresan format emaila"; this.emailok=false;}
    else {this.errorEmail="dobar format emaila"; this.emailok=true;   }
    // jos fali da proverim iz baze da li je jedinstveno
    this.userService.dohvatiKorisnikeZaEmail(this.emailReg).subscribe((korisnici: User[])=>{
    
      korisnici.forEach(kor => {
        this.emailok=false;
        this.errorEmail+=" , korisnik sa email-om vec postoji";
      });

      this.sviZabranjeni.forEach(zabr => {
        if(this.emailReg==zabr.email){
          this.emailok=false;
          this.errorEmail+=" , zabranjeno!";
        }
      });

    })
  }



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



regMessErrButt=""

  register(){
    if (this.lozinkaconfok && this.lozinkaok && this.korimeok && this.imeok && this.prezimeok && this.telefonok && this.emailok && this.imageok){
      this.regMessErrButt=""

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


    // sad klasicno pravim
    this.userService.registruj(this.usernameReg,this.passwordReg,this.nameReg,this.secnameReg,this.adrReg,this.phoneReg,this.emailReg,putDoSlike).subscribe(resp => {
      location.reload()
    })


    }
    else this.regMessErrButt="nesto niste unei ispravno u formi za registraciju"
  }


}
