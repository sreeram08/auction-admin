import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'
import { UserService } from '../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { JsonPipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SEOService } from '../services/seo.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, public router: Router, public activatedRoute: ActivatedRoute, private _snackBar: MatSnackBar, private seoService: SEOService) { }

  ngOnInit() {
    this.seoService.setTitle("Conferro Heritae-Login")
  }

  loginForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl()
  })
  openSnackBar(message: string) {
    this._snackBar.open(message, "Close", {
      duration: 5000,
    });
  }
  onSubmit() {
    let data = this.loginForm.value
    data.role = 1;
    this.userService.login(data).subscribe(async response => {
      console.log(response)
      localStorage.clear();
      if (response.status_code == 200) {
        localStorage.setItem('userData', JSON.stringify(response.data))
        localStorage.setItem('token', response.data.token)
        console.log("LOGIN SUCCESS");
        this.router.navigateByUrl('/users')
        this.userService.isLoggedIn.next(true);
      } else {
        console.log("ERROR")
        this.openSnackBar(response.message);
      }
    })
  }
}
