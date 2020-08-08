import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private _snackBar: MatSnackBar,public router: Router, public userService: UserService) { }
  token;
  ngOnInit(): void {
    
  }

  forgotForm = new FormGroup({
    email: new FormControl()
  });

  openSnackBar(message: string) {
    this._snackBar.open(message, "Close", {
      duration: 5000,
    });
  }

  onSubmit() {
    let data = this.forgotForm.value;
    this.userService.forgotPassword(data).subscribe(response => {
      console.log(response)
      if (response.status_code == 200) {
        this.openSnackBar(response.message);
        this.router.navigateByUrl('/login')
      } else {
        this.openSnackBar(response.message)
      }
    })
  }
}
