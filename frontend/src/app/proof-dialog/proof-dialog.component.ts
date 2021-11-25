import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AttendanceItem } from '../attendance.service';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-proof-dialog',
  templateUrl: './proof-dialog.component.html',
  styleUrls: ['./proof-dialog.component.css']
})
export class ProofDialogComponent implements OnInit {

  submitStatus: boolean = false;

  form: FormGroup;

  nameOfUser: string = "";

  constructor(public dialogRef: MatDialogRef<ProofDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: {eventId: number, eventName: string, attendance?: AttendanceItem, userId: number}, private usersService: UsersService) { 

    let numOfHours = 0;
    let commentMessage = '';
    let ratingStars = 0.0;

    // Assign submit status here based on if there are any proofs submitted.
    if (data.attendance && data.attendance != null) {
      numOfHours = data.attendance.hours;
      commentMessage = data.attendance.comment;
      ratingStars = data.attendance.rating;
    }

    // Create a FormGroup with the Response.
    this.form = new FormGroup({
      // event_id: new FormControl(data.eventId),
      hours: new FormControl(numOfHours, [Validators.min(0), Validators.max(99), Validators.required]),
      comment: new FormControl(commentMessage, [Validators.required]),
      rating: new FormControl(ratingStars, [Validators.min(0), Validators.max(5), Validators.required])
    });

   }

  ngOnInit(): void {
    // Get the user name
    this.usersService.getUserObjectFromId(this.data.userId).subscribe(userOb => {
      console.log(userOb);
      this.nameOfUser = userOb[0].name;
    });
  }

  getMyStyles() {
    let myStyles = {
       'color': this.submitStatus ? 'green' : 'red',
    };
    return myStyles;
  }  

    /**
   * Closes dialog if pressing cancel.
   */
  onCancelClick(): void {
    this.dialogRef.close({event: 'cancel'});
  }

  onSubmitClick(): void {
    console.log(this.form.get("rating")?.value);
    let formData = {
      event_id: this.data.eventId,
      hours: Number(this.form.get("hours")?.value),
      comment: this.form.get("comment")?.value,
      rating: this.form.get("rating")?.value
    };
    this.dialogRef.close({event: 'submitted', data: formData});
  }

}
