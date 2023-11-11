import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import User from '../models/user';

@Component({
  selector: 'app-promlozinke',
  templateUrl: './promlozinke.component.html',
  styleUrls: ['./promlozinke.component.css']
})
export class PromlozinkeComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) {}

  korisnik: User;

  ngOnInit(): void {  
    this.userService.getUser(sessionStorage.getItem("ulogovan")).subscribe((u: User) => {
      if (u==null) this.router.navigate([''])
      this.korisnik = u;
    })
  }


  logout() {
    sessionStorage.removeItem("lekar")
    sessionStorage.removeItem("ulogovan")
    sessionStorage.removeItem("pacijent")
    this.router.navigate([''])
  }

  idiNaPocetnu(){
    sessionStorage.removeItem("lekar")
    sessionStorage.removeItem("pacijent")
    this.router.navigate([this.korisnik.tip])
  }

  enterCurrentPassword: string="";
  passwordReg: string = "";
  passwordRegConf: string = "";
  errorCurrentPassword:string;
  errorPassword: string;
  errorPasswordConf: string;

  proveriTrenutnuLozinku(){
    if (this.korisnik.lozinka===this.enterCurrentPassword) this.errorCurrentPassword=""
    else this.errorCurrentPassword="lozinka nije ista"
  }

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
 
     if (!tst1 || !tst2 || !tst3 || !tst4 || !tst5 || !tst0) this.errorPassword="pogresan format lozinke"
     else this.errorPassword="dobar format lozinke"
   }
 
   proveriLozinkuConf(){
     if (this.passwordRegConf===this.passwordReg) this.errorPasswordConf="lozinke se podudaraju"
     else this.errorPasswordConf="lozinke se ne podudaraju"
   }

   promeniLozinku(){
    if (this.korisnik.lozinka===this.enterCurrentPassword && this.passwordRegConf===this.passwordReg && this.errorPassword=="dobar format lozinke") 
    this.userService.promeniLozinku(this.korisnik.korisnickoIme, this.passwordReg).subscribe(resp => {
      alert(resp['message'])

      sessionStorage.removeItem("lekar")
      sessionStorage.removeItem("ulogovan")
      sessionStorage.removeItem("pacijent")
      this.router.navigate([''])
    })
   }

}
