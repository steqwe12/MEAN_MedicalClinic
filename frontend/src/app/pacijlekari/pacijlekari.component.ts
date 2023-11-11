import { Component, OnInit } from '@angular/core';
import User from '../models/user';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-pacijlekari',
  templateUrl: './pacijlekari.component.html',
  styleUrls: ['./pacijlekari.component.css']
})
export class PacijlekariComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) {}

  idiNaProfil(){
    sessionStorage.removeItem("lekar")
    sessionStorage.removeItem("pacijent")
    this.router.navigate(['pacijent'])
  }

  idiNaLekare(){
    sessionStorage.removeItem("lekar")
    sessionStorage.removeItem("pacijent")
    this.router.navigate(['pacijlekari']) 
  }

  idiNaPreglede(){
    sessionStorage.removeItem("lekar")
    sessionStorage.removeItem("pacijent")
    this.router.navigate(['pacijpregledi']) 
  }

  korisnik: User;

  ngOnInit(): void {  
    this.userService.dohvatiKorisnikePoTipu("lekar").subscribe((lekari: User[])=>{
      this.sviLekari=lekari;
      this.sviLekariMENJANI=lekari;

    })
    this.userService.getUser(sessionStorage.getItem("ulogovan")).subscribe((u: User) => {
      if (u==null) this.router.navigate([''])
      this.korisnik = u;
      if (this.korisnik.tip!=='pacijent') this.router.navigate([''])
    })
    
  }


  sviLekari: User[] = []
  sviLekariMENJANI: User[] = []
  filterIme:string='';
  filterPrezime:string='';
  filterSpec:string='';
  filterOgranak:string=''

  filtrLekare(){
    this.sviLekariMENJANI=this.sviLekari;
    if (this.filterIme!="")
    this.sviLekariMENJANI=this.sviLekariMENJANI.filter(lekar=>lekar.ime.includes(this.filterIme));
    if (this.filterPrezime!="")
    this.sviLekariMENJANI=this.sviLekariMENJANI.filter(lekar=>lekar.prezime.includes(this.filterPrezime));
    if (this.filterSpec!="")
    this.sviLekariMENJANI=this.sviLekariMENJANI.filter(lekar=>lekar.specijalizacija.includes(this.filterSpec));
    if (this.filterOgranak!="")
    this.sviLekariMENJANI=this.sviLekariMENJANI.filter(lekar=>lekar.ogranakOrdinac.includes(this.filterOgranak));
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

  sortDesc4() {
    this.sviLekariMENJANI.sort((writer1, writer2) => {
      if (writer1.ogranakOrdinac < writer2.ogranakOrdinac) {
        return -1;
      }
      else {
        if (writer1.ogranakOrdinac == writer2.ogranakOrdinac) {
          return 0;
        }
        else return 1;
      }
    })
  }

  sortAsc4() {
    this.sviLekariMENJANI.sort((writer1, writer2) => {
      if (writer1.ogranakOrdinac > writer2.ogranakOrdinac) {
        return -1;
      }
      else {
        if (writer1.ogranakOrdinac == writer2.ogranakOrdinac) {
          return 0;
        }
        else return 1;
      }
    })
  }


  logout() {
    sessionStorage.removeItem("lekar")
    sessionStorage.removeItem("ulogovan")
    sessionStorage.removeItem("pacijent")
    this.router.navigate([''])
  }
  

  idiNaStranicuLekara(korisnickoIme:string){
    sessionStorage.setItem("lekar", korisnickoIme)
    this.router.navigate(['prikazilekara'])
  }

}
