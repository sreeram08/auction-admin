import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import {
//   MatSidenavModule, MatToolbarModule, MatIconModule, MatCardModule,
//   MatInputModule,
//   MatButtonModule,
//   MatMenuModule,
//   MatTabsModule,
//   MatTableModule,
//   MatListModule,
//   MatDividerModule,
//   MatDialogModule,
//   MatFormFieldModule
// } from '@angular/material';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';
import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule
} from '@angular-material-components/datetime-picker';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxSimpleCountdownModule } from 'ngx-simple-countdown';
import { LoginComponent } from './login/login.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserToolbarComponent } from './user-toolbar/user-toolbar.component';
import { AuctionTabsComponent } from './auction-tabs/auction-tabs.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { SocketService } from './services/socket.service';
import { AddAuctionModalComponent } from './add-auction-modal/add-auction-modal.component';
import { AddUserComponent } from './add-user/add-user.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { LotsComponent } from './lots/lots.component';
import { AddLotComponent } from './add-lot/add-lot.component';
import { AuctionDetailComponent } from './auction-detail/auction-detail.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AuctionUsersComponent } from './auction-users/auction-users.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserToolbarComponent,
    AuctionTabsComponent,
    AddAuctionModalComponent,
    AddUserComponent,
    LotsComponent,
    AddLotComponent,
    AuctionDetailComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    AuctionUsersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule, MatIconModule,
    MatCardModule, MatInputModule,
    MatButtonModule,
    HttpClientModule,
    MatMenuModule,
    MatTableModule,
    MatTabsModule,
    MatListModule,
    MatDividerModule,
    MatDialogModule,
    MatFormFieldModule,
    NgxSimpleCountdownModule,
    OwlDateTimeModule,
    MatDatepickerModule,
    OwlNativeDateTimeModule,
    NgxMatTimepickerModule,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    MatRadioModule,
    MatSnackBarModule,
    MatGridListModule,
    MDBBootstrapModule.forRoot()
  ],
  entryComponents: [AddAuctionModalComponent],
  providers: [SocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
