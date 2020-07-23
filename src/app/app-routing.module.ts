import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserToolbarComponent } from './user-toolbar/user-toolbar.component';
import { AuctionTabsComponent } from './auction-tabs/auction-tabs.component';
import { AuthGuard } from './guard/auth.guard';
import { CompGuard } from './guard/comp.guard';


const routes: Routes = [
  { path: "login", component: LoginComponent, canActivate: [AuthGuard] },
  { path: "users", component: UserToolbarComponent, canActivate: [CompGuard] },
  { path: "auctions", component: AuctionTabsComponent, canActivate: [CompGuard] },
  { path: "", pathMatch: "full", component: LoginComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
