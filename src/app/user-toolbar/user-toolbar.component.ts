import { Component, OnInit, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from '../add-user/add-user.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject } from 'rxjs';
import { SEOService } from '../services/seo.service';

@Component({
  selector: 'app-user-toolbar',
  templateUrl: './user-toolbar.component.html',
  styleUrls: ['./user-toolbar.component.css'],
  // encapsulation: ViewEncapsulation.None
})
export class UserToolbarComponent implements OnInit {
  last_name: any;
  first_name: any;
  email: any;
  phone: any;
  role: any;

  constructor(public userService: UserService, public router: Router, public dialog: MatDialog, private _snackBar: MatSnackBar, private changeDetectorRef: ChangeDetectorRef, private seoService: SEOService) { }
  public admins;
  public customers;
  public adminDataSource = [];
  public customerDataSource = [];
  ngOnInit() {
    this.seoService.setTitle("Conferro Heritae-Users")
    this.userService.fetchUsers().subscribe(response => {
      console.log(response);
      // console.log(this.customers)

      if (response.status_code == 200) {
        this.admins = response.data.admins;
        this.customers = response.data.customers;
        this.adminDataSource = [...this.admins];
        this.customerDataSource = [...this.customers];
        console.log(this.customers)
      } else {
        console.log("ERROR")
      }
    })
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, "Close", {
      duration: 5000,
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: '450px',
      data: { first_name: this.first_name, last_name: this.last_name, email: this.email, phone: this.phone, role: this.role }
    });

    dialogRef.afterClosed().subscribe(async result => {
      if (result) {
        console.log('The dialog was closed', result);
        let data = {
          first_name: result.first_name,
          last_name: result.last_name,
          email: result.email,
          role: result.role,
          phone: result.phone,
          hosted_by: result.hosted_by || "Conferro Heritae",
        }
        // let success = await this.uploadService.uploadAuctionImage(result.image_url.item(0));
        this.userService.createUser(data).subscribe(response => {
          console.log(response);
          if (response.status_code == 200) {
            // console.log(response)
            data["id"] = response.data.id;
            data["user_name"] = response.data.user_name;
            if (data.role == 2) {
              this.admins.push(data)
              this.adminDataSource = [...this.admins]
            } else if (data.role == 3) {
              this.customers.push(data)
              this.customerDataSource = [...this.customers]
            }
            console.log("SUCCESS");
          } else if (response.status_code == 422) {
            this.openDialog()
            this.openSnackBar(response.message)
            console.log("ERROR")
          }
        })
      }
    });
  }


  displayedColumns: string[] = ['id', 'user_name', 'name', 'email'];
}
