import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MenadzerComponent } from './menadzer/menadzer.component';
import { LekarComponent } from './lekar/lekar.component';
import { PacijentComponent } from './pacijent/pacijent.component';
import { LoginMenadzerComponent } from './login-menadzer/login-menadzer.component';
import { PromlozinkeComponent } from './promlozinke/promlozinke.component';
import { PacijlekariComponent } from './pacijlekari/pacijlekari.component';
import { PrikazilekaraComponent } from './prikazilekara/prikazilekara.component';
import { PacijpreglediComponent } from './pacijpregledi/pacijpregledi.component';
import { LekarpreglediComponent } from './lekarpregledi/lekarpregledi.component';
import { LekarraznoComponent } from './lekarrazno/lekarrazno.component';
import { KartonComponent } from './karton/karton.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'menadzer', component: MenadzerComponent },
  { path: 'lekar', component: LekarComponent },
  { path: 'pacijent', component: PacijentComponent },
  { path: 'loginMenadzer', component: LoginMenadzerComponent },
  { path: 'promLozinke', component: PromlozinkeComponent },
  { path: 'pacijlekari', component: PacijlekariComponent },
  { path: 'prikazilekara', component: PrikazilekaraComponent},
  { path: 'pacijpregledi', component: PacijpreglediComponent},
  { path: 'lekarpregledi', component: LekarpreglediComponent},
  { path: 'lekarrazno', component: LekarraznoComponent},
  { path: 'karton', component: KartonComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
