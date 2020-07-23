import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  constructor(public userService: UserService, public activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    // let role;
    // let type = this.activatedRoute.snapshot.params.type
    // if (type == 'admins') {
    //   role = 2;
    // } else {
    //   role = 3
    // }
    // this.userService.fetchUsers(role).subscribe(response => {
    //   console.log(response);
    //   if (response.status_code == 200) {
    //     console.log("SUCCESS")
    //   } else {
    //     console.log("ERROR")
    //   }
    // })
  }

}
