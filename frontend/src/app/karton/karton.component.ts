import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import User from '../models/user';
import LekarskiIzvestaj from '../models/lekizvestaji';
import zakazaniPregled from '../models/zakazanipregledi';

@Component({
  selector: 'app-karton',
  templateUrl: './karton.component.html',
  styleUrls: ['./karton.component.css']
})
export class KartonComponent implements OnInit {

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
  pacijUsername:string;
  izvestaji:LekarskiIzvestaj[]=[]
  listaPregledaZaPisanjeIzvestaja:zakazaniPregled[]=[]
  
  ngOnInit(): void {
    this.userService.getUser(sessionStorage.getItem("ulogovan")).subscribe((u: User) => {
      if (u==null) this.router.navigate([''])
      this.korisnik = u;
      if (this.korisnik.tip!=='lekar') this.router.navigate([''])

      // ovde dohv izvestaje od pacijenta
      this.pacijUsername=sessionStorage.getItem("pacijent")
      
      this.userService.dohvatiIzvestaje(this.pacijUsername).subscribe((listIzvestaja: LekarskiIzvestaj[]) => {


        //
        let today=new Date();
        let monthtemp=today.getMonth()+1;
        let monthtempSTRING=""
        if (monthtemp<10) monthtempSTRING='0'+monthtemp;
        else monthtempSTRING=''+monthtemp;
    
        let daytempSTRING=""
        if (today.getDate()<10) daytempSTRING='0'+today.getDate();
        else daytempSTRING=''+today.getDate();
    
        let hourtempSTRING=""
        if (today.getHours()<10) hourtempSTRING='0'+today.getHours();
        else hourtempSTRING=''+today.getHours();

        let minutestempSTRING=""
        if (today.getMinutes()<10) minutestempSTRING='0'+today.getMinutes();
        else minutestempSTRING=''+today.getMinutes();


        let danastemp=new Date(today.getFullYear()+'-'+monthtempSTRING+'-'+daytempSTRING+'T'+hourtempSTRING+':'+minutestempSTRING);
        //
        let listIzvestajaTEMP=[]
        listIzvestajaTEMP=listIzvestaja;
        listIzvestajaTEMP= listIzvestajaTEMP.filter(izvest=>new Date(izvest.vremedo)<danastemp);
        this.izvestaji=listIzvestajaTEMP;

        /////////////////////ovde

        this.userService.getZakPregZaPacLek(this.korisnik.korisnickoIme,this.pacijUsername).subscribe((listaZakPreg: zakazaniPregled[]) => {
          
          listaZakPreg=listaZakPreg.filter(zakpreg=>new Date(zakpreg.vremeod)<danastemp) // ostaju svi zak preg prosli i trenutni

          listIzvestaja.forEach(izvestaj => {
            
            listaZakPreg=listaZakPreg.filter(zakpreg=>!(zakpreg.lekar==izvestaj.lekar && zakpreg.vremeod==izvestaj.vremeod))

          });

          this.listaPregledaZaPisanjeIzvestaja=listaZakPreg;


        })



      })

    })
  }
  


  razlogDolaska1:string='';
  dijagnoza1:string='';
  terapija1:string='';
  kontrola1:string='';

  unesiIzvestaj(vremeod:string,vremedo:string){
    if (this.razlogDolaska1=="" || this.dijagnoza1=="" || this.terapija1=="" || this.kontrola1==""){}
    else{
      this.userService.unesiIzvestaj(this.korisnik.korisnickoIme,this.pacijUsername,vremeod,vremedo,this.korisnik.specijalizacija,this.razlogDolaska1,this.dijagnoza1,this.terapija1,this.kontrola1).subscribe(res => {

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
