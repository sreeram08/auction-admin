import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-auction-modal',
  templateUrl: './add-auction-modal.component.html',
  styleUrls: ['./add-auction-modal.component.css']
})
export class AddAuctionModalComponent implements OnInit {
  public minDate;
  selectedFiles: any;
  constructor(public dialogRef: MatDialogRef<AddAuctionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
  ngOnInit() {
    this.minDate = new Date()
  }

  public selectFile(event) {
    console.log(event.target.files.item);
    this.data.image_url = event.target.files;
  }
}
