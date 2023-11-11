import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import User from '../models/user';

@Component({
  selector: 'app-login-menadzer',
  templateUrl: './login-menadzer.component.html',
  styleUrls: ['./login-menadzer.component.css']
})
export class LoginMenadzerComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) { }

  username: string = "";
  password: string = "";
  error: string;

  ngOnInit(): void {
  }

  login() {
    if (this.username == "" || this.password == "") {
      this.error = "Niste uneli sve podatke!";
      return;
    }
    this.error = "";
    this.userService.login(this.username, this.password).subscribe((k: User) => {
      if (k) {

        if (k.tip!="menadzer") {
          this.error = "Ulogujte se na adekvatan nacin";
          return;
        }

        sessionStorage.setItem("ulogovan", k.korisnickoIme)
        this.router.navigate([k.tip])
      } else {
        this.error = "Losi podaci!";
        return;
      }
    })

  }

}
