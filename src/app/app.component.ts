import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'admin';
  constructor(public userService: UserService, public router: Router) { }
  show;
  ngOnInit() {
    this.userService.isLoggedIn.subscribe(data => {
      console.log(data);
      this.show = data
    })
  }

  public logout() {
    localStorage.clear();
    this.userService.isLoggedIn.next(false);
    this.router.navigate(["login"])
  }
}
