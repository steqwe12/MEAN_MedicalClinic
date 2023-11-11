import { NgModule } from '@angular/core';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LekarComponent } from './lekar/lekar.component';
import { PacijentComponent } from './pacijent/pacijent.component';
import { MenadzerComponent } from './menadzer/menadzer.component';
import { LoginMenadzerComponent } from './login-menadzer/login-menadzer.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PromlozinkeComponent } from './promlozinke/promlozinke.component';
import { PacijlekariComponent } from './pacijlekari/pacijlekari.component';
import { PrikazilekaraComponent } from './prikazilekara/prikazilekara.component';
import { PacijpreglediComponent } from './pacijpregledi/pacijpregledi.component';
import { LekarpreglediComponent } from './lekarpregledi/lekarpregledi.component';
import { LekarraznoComponent } from './lekarrazno/lekarrazno.component';
import { KartonComponent } from './karton/karton.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LekarComponent,
    PacijentComponent,
    MenadzerComponent,
    LoginMenadzerComponent,
    PromlozinkeComponent,
    PacijlekariComponent,
    PrikazilekaraComponent,
    PacijpreglediComponent,
    LekarpreglediComponent,
    LekarraznoComponent,
    KartonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
