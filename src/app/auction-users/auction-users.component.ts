import { Component, OnInit } from '@angular/core';
import { AuctionService } from '../services/auction.service';
import { SocketService } from '../services/socket.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SEOService } from '../services/seo.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { RequestsModalComponent } from '../requests-modal/requests-modal.component';

@Component({
  selector: 'app-auction-users',
  templateUrl: './auction-users.component.html',
  styleUrls: ['./auction-users.component.css']
})
export class AuctionUsersComponent implements OnInit {
  auctionId: any;
  approved;
  unapproved = [];
  approvedDataSource = [];
  unapprovedDataSource = [];

  constructor(public auctionService: AuctionService, public socketService: SocketService, private _snackBar: MatSnackBar, private seoService: SEOService, public activatedRoute: ActivatedRoute, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.seoService.setTitle("Conferro Heritae-Users")
    this.auctionId = this.activatedRoute.parent.snapshot.params['auctionId'];
    this.auctionService.fetchUsersInAuction(this.auctionId).subscribe(response => {
      console.log(response);
      if (response.status_code == 200) {
        this.approved = response.data.approvedUsers;
        this.approvedDataSource = [...this.approved];
        this.unapproved = response.data.unapprovedUsers;
      } else {
        console.log("ERROR")
        this.openSnackBar(response.message)
      }
    })
  }
  openSnackBar(message: string) {
    this._snackBar.open(message, "Close", {
      duration: 5000,
    });

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(RequestsModalComponent, {
      width: '450px',
      data: this.unapproved
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
        this.auctionService.createUser(data).subscribe(response => {
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
