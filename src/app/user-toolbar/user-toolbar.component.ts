import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { isString } from 'util';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-user-toolbar',
  templateUrl: './user-toolbar.component.html',
  styleUrls: ['./user-toolbar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserToolbarComponent implements OnInit {

  constructor(public userService: UserService, public router: Router) { }
  public admins = [];
  public customers = [];
  ngOnInit() {
    this.userService.fetchUsers().subscribe(response => {
      console.log(response);
      console.log(this.customers)

      if (response.status_code == 200) {
        this.admins = response.data.admins;
        this.customers = response.data.customers;
        console.log(this.customers)
      } else {
        console.log("ERROR")
      }
    })
  }
  displayedColumns: string[] = ['id', 'user_name', 'name', 'email'];
}
