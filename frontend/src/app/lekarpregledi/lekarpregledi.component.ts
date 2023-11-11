import { Component, OnInit } from '@angular/core';
import User from '../models/user';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import zakazaniPregled from '../models/zakazanipregledi';

@Component({
  selector: 'app-lekarpregledi',
  templateUrl: './lekarpregledi.component.html',
  styleUrls: ['./lekarpregledi.component.css']
})
export class LekarpreglediComponent implements OnInit {

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
  triZakPreg:zakazaniPregled[]=[];

  ngOnInit(): void {
    this.userService.getUser(sessionStorage.getItem("ulogovan")).subscribe((u: User) => {
      if (u==null) this.router.navigate([''])
      this.korisnik = u;
      if (this.korisnik.tip!=='lekar') this.router.navigate([''])
      this.triZakPreg=[];

      this.userService.getZakazanePreglede(this.korisnik.korisnickoIme).subscribe((zakPregledi: zakazaniPregled[]) => {
        
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

        zakPregledi= zakPregledi.filter(pregl=>new Date(pregl.vremeod)>danastemp);

        zakPregledi=zakPregledi.sort((preg1, preg2)=>{
          let vr1 = new Date(preg1.vremeod)
          let vr2 = new Date(preg2.vremeod)

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

        let br=0;
        zakPregledi.forEach(zakPregl => {

          if (br<3)
          this.triZakPreg.push(zakPregl);

          br=br+1;
        });




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

  pogledajKarton(pacijent:string){

    sessionStorage.setItem("pacijent", pacijent)
    this.router.navigate(['karton'])
  }

}
