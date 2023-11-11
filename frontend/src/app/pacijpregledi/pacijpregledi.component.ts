import { Component, OnInit } from '@angular/core';
import User from '../models/user';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import LekarskiIzvestaj from '../models/lekizvestaji';
import zakazaniPregledIOgranak from '../models/zakpregIogranak';
import zakazaniPregled from '../models/zakazanipregledi';

@Component({
  selector: 'app-pacijpregledi',
  templateUrl: './pacijpregledi.component.html',
  styleUrls: ['./pacijpregledi.component.css']
})
export class PacijpreglediComponent implements OnInit {

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
  izvestaji: LekarskiIzvestaj[]=[]
  pregledi:zakazaniPregledIOgranak[]=[]
  

  ngOnInit(): void {  
    this.userService.getUser(sessionStorage.getItem("ulogovan")).subscribe((u: User) => {
      if (u==null) this.router.navigate([''])
      this.korisnik = u;
      if (this.korisnik.tip!=='pacijent') this.router.navigate([''])
      this.izvestaji=[];
      this.pregledi=[]

      this.userService.dohvatiIzvestaje(this.korisnik.korisnickoIme).subscribe((izvest: LekarskiIzvestaj[]) => {

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

        izvest.forEach(izvestaj => {
          let datumIzvestajaa= new Date(izvestaj.vremedo);
          if (datumIzvestajaa<danastemp) this.izvestaji.push(izvestaj);
        });
        
          this.izvestaji=this.izvestaji.sort((izv1, izv2)=>{
          let vr1 = new Date(izv1.vremedo)
          let vr2 = new Date(izv2.vremedo)

          if(vr1>vr2){   // MOZDA TREBA OBRNUTO (DOBRO JE !CINI MI SE)
            return 1;
          }
          else{
            if(vr1==vr2){
              return 0;
            }
            else return -1;
          }
        })
      })




      // ovde dohv preglede
      this.userService.dohvatiZakPreglede(this.korisnik.korisnickoIme).subscribe((zakPregledi: zakazaniPregled[]) => {

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

        let tmpniz:zakazaniPregled[]=[]  // to je tam tmpniz koji cu da koristim

        zakPregledi.forEach(zakPregled => {
          let datumZakPregleda= new Date(zakPregled.vremedo);
          if (datumZakPregleda>danastemp) tmpniz.push(zakPregled);
        });



        this.userService.dohvatiSveLekare("lekar").subscribe((lekari: User[]) => {

          tmpniz.forEach(zakpreg123 => {
            
            lekari.forEach(lekar123 => {
              if (zakpreg123.lekar==lekar123.korisnickoIme)
              this.pregledi.push(new zakazaniPregledIOgranak(zakpreg123,lekar123.ogranakOrdinac))
            });

          });


          //ovde sort
          this.pregledi=this.pregledi.sort((preg1, preg2)=>{
            let vr1 = new Date(preg1.zakazaniPregled.vremedo)
            let vr2 = new Date(preg2.zakazaniPregled.vremedo)

            if(vr1>vr2){
              return 1;
            }
            else{
              if(vr1==vr2){
                return 0;
              }
              else return -1;
            }
          })



        })





      })




    })
  }



  otkaziPregled(lekar:string,vremeod:string){
    this.userService.otkaziPregled(lekar,vremeod).subscribe(resp => {
      

    location.reload();
    })
  }


  logout() {
    sessionStorage.removeItem("lekar")
    sessionStorage.removeItem("ulogovan")
    sessionStorage.removeItem("pacijent")
    this.router.navigate([''])
  }
  
  

}
