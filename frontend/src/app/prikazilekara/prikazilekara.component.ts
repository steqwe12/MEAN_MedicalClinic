import { Component, OnInit } from '@angular/core';
import User from '../models/user';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import ObavljaPregledeMod from '../models/obavpregld';
import zakazaniPregled from '../models/zakazanipregledi';

@Component({
  selector: 'app-prikazilekara',
  templateUrl: './prikazilekara.component.html',
  styleUrls: ['./prikazilekara.component.css']
})
export class PrikazilekaraComponent implements OnInit {

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
  lekar: User;
  obavljaPreglede:ObavljaPregledeMod[]=[];
  zakazaniPregledi:zakazaniPregled[]=[]


  ngOnInit(): void {  
    this.lekar=null;

    this.userService.getUser(sessionStorage.getItem("ulogovan")).subscribe((u: User) => {
      if (u==null) this.router.navigate([''])
      this.korisnik = u;
      if (this.korisnik.tip!=='pacijent') this.router.navigate([''])
    })
    this.userService.getUser(sessionStorage.getItem("lekar")).subscribe((u: User) => {
      this.lekar = u;

      this.userService.getVrstePregleda(this.lekar.korisnickoIme).subscribe((u: ObavljaPregledeMod[]) => {
        this.obavljaPreglede = u;
      })

      this.userService.getZakazanePreglede(this.lekar.korisnickoIme).subscribe((u: zakazaniPregled[]) => {
        this.zakazaniPregledi = u;
      })

    })

      
  }

  izabpregled:string='';
  zeljeniDatum:string='';
  zeljenoVreme:string='';
  errorBiranja=""

  ceoIzabPregled:ObavljaPregledeMod;

  zakaziPregled(){
    this.errorBiranja=""
    if (this.izabpregled=="") this.errorBiranja+=" niste izabrali pregled "
    if (this.zeljeniDatum=="") this.errorBiranja+=" niste izabrali datum "
    if (this.zeljenoVreme=="") this.errorBiranja+=" niste izabrali vreme "

    let regex1= /^\d{4}-\d{2}-\d{2}$/
    let regex2= /^\d{2}:\d{2}$/

    let tst1=this.zeljeniDatum.match(regex1);
    let tst2=this.zeljenoVreme.match(regex2);

    if(!tst1) this.errorBiranja+=" nije ispravan format datuma "
    if(!tst2) this.errorBiranja+=" nije ispravan format vremena "

    //
    let posleDanas=false;
    let zdattemp= new Date(this.zeljeniDatum);
    let today=new Date();
    let monthtemp=today.getMonth()+1;
    let monthtempSTRING=""
    if (monthtemp<10) monthtempSTRING+='0'+monthtemp;
    else monthtempSTRING+=''+monthtemp;

    let daytempSTRING=""
    if (today.getDate()<10) daytempSTRING+='0'+today.getDate();
    else daytempSTRING+=''+today.getDate();

    let danastemp=new Date(today.getFullYear()+'-'+monthtempSTRING+'-'+daytempSTRING); // prosledi ovde
    if (zdattemp>danastemp) posleDanas=true;
    //

    if(!(this.izabpregled=="") && !(this.zeljeniDatum=="") && !(this.zeljenoVreme=="") && tst1 && tst2 && posleDanas){

      this.obavljaPreglede.forEach(obPr => {
        if (obPr.naziv==this.izabpregled)
        this.ceoIzabPregled=obPr;
      });

      let zeljDatOd = new Date(this.zeljeniDatum+'T'+this.zeljenoVreme)
      let zeljDatDo = new Date(zeljDatOd)
      if (isNaN(zeljDatOd.getTime())) {this.errorBiranja+=" nije ispravan datum  " ;return;}
      zeljDatDo.setMinutes(zeljDatOd.getMinutes()+this.ceoIzabPregled.trajanje)
      let tmin = zeljDatDo.getMinutes();
      let thrs = zeljDatDo.getHours();
      let tday = zeljDatDo.getDate();
      let tmnt = zeljDatDo.getMonth()+1;

      let tminstr = ""
      let thrsstr = ""
      let tdaystr = ""
      let tmntstr = ""

      if (tmin<10) tminstr='0'+tmin;
      else tminstr=''+tmin;
      if (thrs<10) thrsstr='0'+thrs;
      else thrsstr=''+thrs;
      if (tday<10) tdaystr='0'+tday;
      else tdaystr=''+tday;
      if (tmnt<10) tmntstr='0'+tmnt;
      else tmntstr=''+tmnt;

      zeljDatDo= new Date(zeljDatDo.getFullYear()+'-'+tmntstr+'-'+tdaystr+'T'+thrsstr+':'+tminstr);


      let slobodan=true;

      this.zakazaniPregledi.forEach(zpregled => {
        let zakVremeOd = new Date(zpregled.vremeod)
        let zakVremeDo = new Date(zpregled.vremedo)

        if ((zeljDatOd<=zakVremeOd && zeljDatDo>=zakVremeOd) || (zeljDatOd<=zakVremeDo && zeljDatDo>=zakVremeDo) || (zeljDatOd<=zakVremeOd && zeljDatDo>=zakVremeDo) || (zeljDatOd>=zakVremeOd && zeljDatDo<=zakVremeDo))
        slobodan=false;
      });

      if (slobodan==true){
        // zakazi termin ubaci u zakazaniPregledi
        //let month1 = zeljDatOd.getMonth()+1;
        //let month2 = zeljDatDo.getMonth()+1;
        //let stringzeljDatOd = zeljDatOd.getFullYear()+'-'+month1+'-'+zeljDatOd.getDate()+'T'+zeljDatOd.getHours()+':'+zeljDatOd.getMinutes();
        //let stringzeljDatDo = zeljDatDo.getFullYear()+'-'+month2+'-'+zeljDatDo.getDate()+'T'+zeljDatDo.getHours()+':'+zeljDatDo.getMinutes();
        let month1 = zeljDatOd.getMonth()+1;
        let month2 = zeljDatDo.getMonth()+1;
        
        let month1str=""
        if (month1<10) month1str='0'+month1;
        else month1str=''+month1;
        let month2str=""
        if (month2<10) month2str='0'+month2;
        else month2str=''+month2;

        let date1str=""
        if (zeljDatOd.getDate()<10) date1str='0'+zeljDatOd.getDate();
        else date1str=''+zeljDatOd.getDate();
        let date2str=""
        if (zeljDatDo.getDate()<10) date2str='0'+zeljDatDo.getDate();
        else date2str=''+zeljDatDo.getDate();

        let hour1str=""
        if (zeljDatOd.getHours()<10) hour1str='0'+zeljDatOd.getHours();
        else hour1str=''+zeljDatOd.getHours();
        let hour2str=""
        if (zeljDatDo.getHours()<10) hour2str='0'+zeljDatDo.getHours();
        else hour2str=''+zeljDatDo.getHours();

        let min1str=""
        if (zeljDatOd.getMinutes()<10) min1str='0'+zeljDatOd.getMinutes();
        else min1str=''+zeljDatOd.getMinutes();
        let min2str=""
        if (zeljDatDo.getMinutes()<10) min2str='0'+zeljDatDo.getMinutes();
        else min2str=''+zeljDatDo.getMinutes();



        let stringzeljDatOd = zeljDatOd.getFullYear()+'-'+month1str+'-'+date1str+'T'+hour1str+':'+min1str;
        let stringzeljDatDo = zeljDatDo.getFullYear()+'-'+month2str+'-'+date2str+'T'+hour2str+':'+min2str;
        this.userService.zakaziPregled(this.ceoIzabPregled.korisnickoIme,this.ceoIzabPregled.naziv,this.ceoIzabPregled.trajanje,this.ceoIzabPregled.cena,stringzeljDatOd,stringzeljDatDo,this.korisnik.korisnickoIme).subscribe((resp) => {

        this.userService.getZakazanePreglede(this.lekar.korisnickoIme).subscribe((u: zakazaniPregled[]) => {
          this.zakazaniPregledi = u;
        })
      })

        alert(" USPESNO ZAKAZAO PREGLED ");
        location.reload();
      }
      else{
        this.errorBiranja+=" TERMIN JE ZAUZET "
      }


    }
  }



  logout() {
    sessionStorage.removeItem("ulogovan")
    sessionStorage.removeItem("lekar")
    sessionStorage.removeItem("pacijent")
    this.router.navigate([''])
  }

}
