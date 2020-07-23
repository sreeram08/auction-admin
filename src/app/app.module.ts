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
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxSimpleCountdownModule } from 'ngx-simple-countdown';
import { LoginComponent } from './login/login.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserToolbarComponent } from './user-toolbar/user-toolbar.component';
import { UsersListComponent } from './users-list/users-list.component';
import { AuctionTabsComponent } from './auction-tabs/auction-tabs.component';
import { SocketService } from './services/socket.service';
import { AddAuctionModalComponent } from './add-auction-modal/add-auction-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserToolbarComponent,
    UsersListComponent,
    AuctionTabsComponent,
    AddAuctionModalComponent
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
    NgxMatNativeDateModule
  ],
  entryComponents: [AddAuctionModalComponent],
  providers: [SocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
