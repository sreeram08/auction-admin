import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { AuctionService } from '../services/auction.service';

@Component({
  selector: 'app-auction-detail',
  templateUrl: './auction-detail.component.html',
  styleUrls: ['./auction-detail.component.css']
})
export class AuctionDetailComponent implements OnInit {
  public auctionId;
  public auction;
  constructor(public router: Router, public activatedRouter: ActivatedRoute, private auctionService: AuctionService) { }

  ngOnInit(): void {
    this.auctionId = this.activatedRouter.snapshot.params['auctionId']
    console.log(this.auctionId)
    this.auctionService.fetchAuctionById(this.auctionId).subscribe(response => {
      console.log(response)
      if (response.status_code == 200) {
        this.auction = response.data
      }
    })

  }
  ellipsesFunc() {
    var dots = document.getElementById("dots");
    var moreText = document.getElementById("more");
    var btnText = document.getElementById("myBtn");

    if (dots.style.display === "none") {
      dots.style.display = "inline";
      btnText.innerHTML = "Read more";
      moreText.style.display = "none";
    } else {
      dots.style.display = "none";
      btnText.innerHTML = "Read less";
      moreText.style.display = "inline";
    }
  }
}
