import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuctionService } from '../services/auction.service';
import { SocketService } from '../services/socket.service'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddAuctionModalComponent } from '../add-auction-modal/add-auction-modal.component';
import { UploadService } from '../services/upload.service';
import { unix } from 'moment';

@Component({
  selector: 'app-auction-tabs',
  templateUrl: './auction-tabs.component.html',
  styleUrls: ['./auction-tabs.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AuctionTabsComponent implements OnInit {
  selectedIndex = 1
  public pastAuctions;
  public currentAuctions;
  public upcomingAuctions;
  public io;
  public newAuction;
  name: any;
  image_url: any;
  hosted_by: any = "Conferro Heritae";
  from_to: any;
  live_at: any;
  end_at: any;
  constructor(public auctionService: AuctionService, public socketService: SocketService, public uploadService: UploadService, public dialog: MatDialog) { }

  ngOnInit() {
    this.auctionService.fetchAuctions().subscribe(response => {
      console.log(response);
      if (response.status_code == 200) {
        this.pastAuctions = response.data.past;
        this.currentAuctions = response.data.current;
        this.upcomingAuctions = response.data.upcoming;
        console.log(this.currentAuctions)
        console.log("SUCCESS")
      } else {
        console.log("ERROR")
      }
    })
    this.io = this.socketService.socket;
  }
  updateAuction() {
    this.io.emit('updateAuction', 12);
  }

  trimDate(unixTime) {
    console.log(unixTime);
    console.log(unixTime/1000)
    return unixTime/1000
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddAuctionModalComponent, {
      width: '250px',
      data: { name: this.name, image_url: this.image_url, live_at: this.live_at, end_at: this.end_at, hosted_by: this.hosted_by }
    });

    dialogRef.afterClosed().subscribe(async result => {
      console.log('The dialog was closed', result);
      console.log("From time -- ", new Date(result.live_at).getTime())
      console.log("To time -- ", result.image_url)
      let data = {
        name: result.name,
        live_at: new Date(result.live_at).getTime(),
        end_at: new Date(result.end_at).getTime(),
        hosted_by: result.hosted_by || "Conferro Heritae",
      }
      let success = await this.uploadService.uploadAuctionImage(result.image_url.item(0));
      console.log(success)
      data["image_url"] = success
      this.auctionService.createAuction(data).subscribe(response => {
        console.log(response);
        if (response.status_code == 200) {
          data["id"] = response.data
          this.upcomingAuctions.push(data)
          console.log("SUCCESS");
        } else {
          console.log("ERROR")
        }
      })
    });
  }

}
