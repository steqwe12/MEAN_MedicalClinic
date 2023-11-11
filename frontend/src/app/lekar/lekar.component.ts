import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import User from '../models/user';
import PostojePregledi from '../models/postojepregledi';
import ObavljaPregledeMod from '../models/obavpregld';

@Component({
  selector: 'app-lekar',
  templateUrl: './lekar.component.html',
  styleUrls: ['./lekar.component.css']
})
export class LekarComponent implements OnInit {

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
  postojePregledi:PostojePregledi[]=[]

  ngOnInit(): void {
    this.userService.getUser(sessionStorage.getItem("ulogovan")).subscribe((u: User) => {
      if (u==null) this.router.navigate([''])
      this.korisnik = u;
      if (this.korisnik.tip!=='lekar') this.router.navigate([''])

      this.postojePregledi=[];
      this.userService.getSvePostojePreglediZaSpec(this.korisnik.specijalizacija).subscribe((postpregl: PostojePregledi[]) => {

        this.userService.getSveObavljaPregledeZaIme(this.korisnik.korisnickoIme).subscribe((obavpregl: ObavljaPregledeMod[]) => {

          obavpregl.forEach(elem => {
            
            //da postoje pregl naziv nije jednak nazivu pregleda koje obavlja
            postpregl= postpregl.filter(pregl=>pregl.naziv!==elem.naziv);

          });

          this.postojePregledi=postpregl;
        })

      })


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

  dodajUObavljaPreglede(naziv:string,trajanje:number,cena:number){
    this.userService.dodajUObavljaPreglede(this.korisnik.korisnickoIme,naziv,trajanje,cena).subscribe(resp => {

      location.reload();
    })
  }



}
