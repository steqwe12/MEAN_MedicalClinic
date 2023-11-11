import { Component, OnInit } from '@angular/core';
import User from '../models/user';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-lekarrazno',
  templateUrl: './lekarrazno.component.html',
  styleUrls: ['./lekarrazno.component.css']
})
export class LekarraznoComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) { }

  idiNaProfil(){
    sessionStorage.removeItem("lekar")
    sessionStorage.removeItem("pacijent")
    this.router.navigate(['lekar'])
  }

  idiNaPreglede(){
    sessionStorage.removeItem("lekar")
    sessionStorage.removeItem("pacijent")
    this.router.navigate(['lekarpregledi']) 
  }

  idiNaRazno(){
    sessionStorage.removeItem("lekar")
    sessionStorage.removeItem("pacijent")
    this.router.navigate(['lekarrazno']) 
  }

  korisnik: User;

  ngOnInit(): void {
    this.userService.getUser(sessionStorage.getItem("ulogovan")).subscribe((u: User) => {
      if (u==null) this.router.navigate([''])
      this.korisnik = u;
      if (this.korisnik.tip!=='lekar') this.router.navigate([''])
    })
  }

  naziv: string='';
  trajanje: number=0;
  cena: number=0;
  specijalizacija: string='';

  proslediZahtev(){
    if (this.naziv!="" && this.trajanje>0 && this.cena>=0 && this.specijalizacija!=""){
    this.userService.proslediZahtev(this.naziv,this.trajanje,this.cena,this.specijalizacija).subscribe(res => {

      location.reload();
    })
  }
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
