import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { ConnectedPositionStrategy } from '@angular/cdk/overlay';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) { };
  canActivate() {
    if (!localStorage.getItem('token')) {
      // console.log("FAILED AT GAURDE", false)
      this.userService.isLoggedIn.next(false)
      return true
    }
    else {
      this.userService.isLoggedIn.next(true)
      this.router.navigate(['/users'])
    }
  }
}
