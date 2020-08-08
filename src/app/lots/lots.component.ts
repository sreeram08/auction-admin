import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuctionService } from '../services/auction.service';
import { SocketService } from '../services/socket.service';
import { UploadService } from '../services/upload.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SEOService } from '../services/seo.service';
import { AddLotComponent } from '../add-lot/add-lot.component';
import { LotService } from '../services/lot.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lots',
  templateUrl: './lots.component.html',
  styleUrls: ['./lots.component.css'],
})
export class LotsComponent implements OnInit {
  name: any;
  image_url: any;
  description: any;
  min_estimate: any;
  start_at: any;
  end_at: any;
  auctionId;
  lotsList = [];
  min_bid_amount: any;
  constructor(public auctionService: AuctionService, public lotService: LotService, public socketService: SocketService, public uploadService: UploadService, public dialog: MatDialog, private _snackBar: MatSnackBar, private seoService: SEOService, public activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.seoService.setTitle("Conferro Heritae-Lots")
    this.auctionId = this.activatedRoute.parent.snapshot.params['auctionId'];
    this.lotService.fetchLotsByAuction(this.auctionId).subscribe(response => {
      console.log(response);
      if (response.status_code == 200) {
        this.lotsList = response.data
        console.log("SUCCESS")
      } else {
        this.openSnackBar(response.message)
      }
    })
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, "Close", {
      duration: 5000,
    });
  }
  trimDate(unixTime) {
    // console.log(unixTime)
    return unixTime / 1000
  }
  createAuctionDialog(): void {
    const createDialogRef = this.dialog.open(AddLotComponent, {
      width: '450px',
      data: { name: this.name, image_url: this.image_url, description: this.description, max_estimate: this.min_estimate, min_estimate: this.min_estimate, start_at: this.start_at, end_at: this.end_at, min_bid_amount: this.min_bid_amount, type: "Create" }
    });

    createDialogRef.afterClosed().subscribe(async result => {
      if (result) {
        let data = {
          auction_id: this.auctionId,
          name: result.name,
          description: result.description,
          max_estimate: result.max_estimate,
          min_estimate: result.min_estimate,
          bid_start_time: new Date(result.start_at).getTime(),
          bid_end_time: new Date(result.end_at).getTime(),
          min_bid_amount: result.min_bid_amount
        }
        let success = await this.uploadService.uploadLotImage(result.image_url.item(0));
        console.log(success)
        data["image_url"] = success
        this.lotService.createLot(data).subscribe(response => {
          console.log(response);
          if (response.status_code == 200) {
            data["id"] = response.data.id;
            this.lotsList.push(data);
            // this.selectedIndex = 2
            // this.ngOnInit()
            console.log("SUCCESS");
          } else {
            this.openSnackBar(response.message)
            console.log("ERROR")
          }
        })
      }
    });
  }

}
