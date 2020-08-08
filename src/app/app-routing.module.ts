import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserToolbarComponent } from './user-toolbar/user-toolbar.component';
import { AuctionTabsComponent } from './auction-tabs/auction-tabs.component';
import { AuthGuard } from './guard/auth.guard';
import { CompGuard } from './guard/comp.guard';
import { LotsComponent } from './lots/lots.component';
import { AuctionDetailComponent } from './auction-detail/auction-detail.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AuctionUsersComponent } from './auction-users/auction-users.component';


const routes: Routes = [
  { path: "login", component: LoginComponent, canActivate: [AuthGuard] },
  { path: "users", component: UserToolbarComponent, canActivate: [CompGuard] },
  { path: "auctions", component: AuctionTabsComponent, canActivate: [CompGuard] },
  { path: "forgot-password", component: ForgotPasswordComponent, canActivate: [AuthGuard] },
  { path: "reset-password/:token", component: ResetPasswordComponent, canActivate: [AuthGuard] },
  {
    path: "auction/details/:auctionId", component: AuctionDetailComponent, canActivate: [CompGuard], children: [
      // { path: "", redirectTo: 'auction/details/:auctionId/lots', pathMatch: "full", canActivate: [CompGuard] },
      { path: "lots", component: LotsComponent, canActivate: [CompGuard] },
      { path: "users", pathMatch: "full", component: AuctionUsersComponent, canActivate: [CompGuard] }
    ]
  },
  { path: "", pathMatch: "full", component: LoginComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 
