import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private _snackBar: MatSnackBar,public router: Router, public userService: UserService, private activatedRoter: ActivatedRoute) { }
  token;
  ngOnInit(): void {
    this.token = this.activatedRoter.snapshot.params['token']
  }

  resetForm = new FormGroup({
    password: new FormControl()
  });

  openSnackBar(message: string) {
    this._snackBar.open(message, "Close", {
      duration: 5000,
    });
  }

  onSubmit() {
    let data = this.resetForm.value;
    data.token = this.token
    this.userService.resetPassword(data).subscribe(response => {
      console.log(response)
      if (response.status_code == 200) {
        this.openSnackBar(response.message);
        setTimeout(() => {
          this.router.navigateByUrl('/login')
        }, 3000);
      } else {
        this.openSnackBar(response.message)
      }
    })
  }

}
