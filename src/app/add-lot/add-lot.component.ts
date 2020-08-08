import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddAuctionModalComponent } from '../add-auction-modal/add-auction-modal.component';

@Component({
  selector: 'app-add-lot',
  templateUrl: './add-lot.component.html',
  styleUrls: ['./add-lot.component.css']
})
export class AddLotComponent implements OnInit {

  validation;
  constructor(public dialogRef: MatDialogRef<AddLotComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
  public minDate;
  selectedFiles: any;
  url: string | ArrayBuffer;
  ngOnInit(): void {
    this.minDate = new Date();
    this.url = this.data.image_url;
  }
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result || this.data.image_url;
      }
      console.log(event.target.files.item);
      this.data.image_url = event.target.files;
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  public selectFile(event) {
    console.log(event.target.files.item);
    this.data.image_url = event.target.files;
  }
  comparePrice() {
    if (this.data.min_estimate && this.data.max_estimate) {
      if (this.data.max_estimate > this.data.min_estimate) {
        return true
      } else {
        return false
      }
    }
    else {
      return true
    }
  }

}
