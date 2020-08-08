import { Component, OnInit, Inject } from '@angular/core';
import { AddAuctionModalComponent } from '../add-auction-modal/add-auction-modal.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  public minDate;
  selectedFiles: any;
  url: string | ArrayBuffer;
  constructor(public dialogRef: MatDialogRef<AddUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
  ngOnInit() {
    this.minDate = new Date();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
