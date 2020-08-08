import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-auction-modal',
  templateUrl: './add-auction-modal.component.html',
  styleUrls: ['./add-auction-modal.component.css']
})
export class AddAuctionModalComponent implements OnInit {
  public minDate;
  selectedFiles: any;
  url: string | ArrayBuffer;
  constructor(public dialogRef: MatDialogRef<AddAuctionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
  ngOnInit() {
    this.minDate = new Date();
    this.url= this.data.image_url;
  }
  loginForm = new FormGroup({

  })
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
}
