import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'
import { UserService } from '../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { JsonPipe } from '@angular/common';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, public router: Router, public activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  }

  loginForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl()
  })

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
      }
    })
  }
}
