import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuctionService } from '../services/auction.service';
import { SocketService } from '../services/socket.service'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddAuctionModalComponent } from '../add-auction-modal/add-auction-modal.component';
import { UploadService } from '../services/upload.service';
import { unix } from 'moment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SEOService } from '../services/seo.service';

@Component({
  selector: 'app-auction-tabs',
  templateUrl: './auction-tabs.component.html',
  styleUrls: ['./auction-tabs.component.css'],
  // encapsulation: ViewEncapsulation.None
})
export class AuctionTabsComponent implements OnInit {
  selectedIndex = 1
  public currentDate = new Date().getTime();
  public pastAuctions = [];
  public currentAuctions = [];
  public upcomingAuctions = [];
  public allAuctions = [];
  public io;
  public newAuction;
  name: any;
  image_url: any;
  hosted_by: any = "Conferro Heritae";
  from_to: any;
  live_at: any;
  end_at: any;
  description: any;
  constructor(public auctionService: AuctionService, public socketService: SocketService, public uploadService: UploadService, public dialog: MatDialog, private _snackBar: MatSnackBar, private seoService: SEOService) { }

  ngOnInit() {
    this.seoService.setTitle("Conferro Heritae-Auctions")
    this.auctionService.fetchAuctions().subscribe(response => {
      console.log(response);
      if (response.status_code == 200) {
        this.pastAuctions = response.data.past;
        this.currentAuctions = response.data.current;
        this.upcomingAuctions = response.data.upcoming;
        this.allAuctions.push(...this.pastAuctions, ...this.currentAuctions, ...this.upcomingAuctions)
        console.log(this.allAuctions)
        console.log("SUCCESS")
      } else {
        this.openSnackBar(response.message)
        console.log("ERROR")
      }
    })
    this.io = this.socketService.socket;
  }
  updateAuction() {
    this.io.emit('updateAuction', 12);
  }

  trimDate(unixTime) {
    return unixTime / 1000
  }
  openSnackBar(message: string) {
    this._snackBar.open(message, "Close", {
      duration: 5000,
    });
  }
  createAuctionDialog(): void {
    const createDialogRef = this.dialog.open(AddAuctionModalComponent, {
      width: '450px',
      data: { name: this.name, image_url: this.image_url, description: this.description, live_at: this.live_at, end_at: this.end_at, hosted_by: this.hosted_by, type: "Create" }
    });

    createDialogRef.afterClosed().subscribe(async result => {
      if (result) {
        console.log('The dialog was closed', result);
        console.log("From time -- ", new Date(result.live_at).getTime())
        console.log("To time -- ", result.image_url)
        let data = {
          name: result.name,
          live_at: new Date(result.live_at).getTime(),
          end_at: new Date(result.end_at).getTime(),
          description: result.description,
          hosted_by: result.hosted_by || "Conferro Heritae",
        }
        let success = await this.uploadService.uploadAuctionImage(result.image_url.item(0));
        console.log(success)
        data["image_url"] = success
        this.auctionService.createAuction(data).subscribe(response => {
          console.log(response);
          if (response.status_code == 200) {
            data["id"] = response.data;
            this.upcomingAuctions.push(data);
            this.selectedIndex = 2
            this.ngOnInit()
            console.log("SUCCESS");
          } else {
            console.log("ERROR")
          }
        })
      }
    });
  }


  editAuctionDialog(auction, type, index): void {
    console.log(type)
    auction.live_at = new Date(auction.live_at);
    auction.end_at = new Date(auction.end_at);
    console.log("SELECTED AUCTION -- ", auction)
    const createDialogRef = this.dialog.open(AddAuctionModalComponent, {
      width: '450px',
      data: { id: auction.id, name: auction.name, image_url: auction.image_url, description: auction.description, live_at: auction.live_at, end_at: auction.end_at, hosted_by: auction.hosted_by, type: "Edit" }
    });

    createDialogRef.afterClosed().subscribe(async result => {
      console.log("EDITED AUCTION DATA -- ", result)
      let data = {
        auction_id: auction.id,
        name: result.name,
        live_at: new Date(result.live_at).getTime(),
        end_at: new Date(result.end_at).getTime(),
        description: result.description,
        hosted_by: result.hosted_by || "Conferro Heritae",
      }
      if (result.image_url != auction.image_url) {
        console.log("IMAGE URL UPDATED , UPLOADING....")
        let success = await this.uploadService.uploadAuctionImage(result.image_url.item(0));
        data["image_url"] = success;
      } else {
        console.log("IMAGE URL UNCHANGES")
        data['image_url'] = auction.image_url
      }
      console.log("UPDATED DATA -- ", data)
      this.auctionService.editAuction(data).subscribe(response => {
        console.log(response);
        if (response.status_code == 200) {
          if (type == 'past') {
            this.pastAuctions[index] = data;
            this.selectedIndex = 0
          }
          if (type == 'current') {
            this.currentAuctions[index] = data;
            this.selectedIndex = 1
          }
          if (type == 'upcoming') {
            this.upcomingAuctions[index] = data;
            this.selectedIndex = 2
          }
          console.log("SUCCESS");
        } else {
          console.log("ERROR")
        }
      });
    });
  }
}
