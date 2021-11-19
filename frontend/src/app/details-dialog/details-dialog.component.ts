import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AttendanceItem, AttendanceService } from '../attendance.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { EventItem } from '../events.service';
import { ProofDialogComponent } from '../proof-dialog/proof-dialog.component';
import { SignupService } from '../signup.service';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-details-dialog',
  templateUrl: './details-dialog.component.html',
  styleUrls: ['./details-dialog.component.css']
})
export class DetailsDialogComponent implements OnInit {

  eventId: number;
  eventDate: string;
  eventTimes: string;
  numberFilled: number;
  numberWaitlistFilled: number;

  // Used to determine what buttons should be displayed.
  loadComplete: boolean = false;
  currentlyEnrolled: boolean = false;
  currentlyWaitlisted: boolean = false;
  positionOnList: number = 0;
  myId: number = 0;

  constructor(public dialogRef: MatDialogRef<DetailsDialogComponent>, @Inject (MAT_DIALOG_DATA) public data: EventItem, public signupService: SignupService, public userService: UsersService, public attendanceService: AttendanceService, public dialog: MatDialog) {
    this.eventId = this.data.event_id;
    this.eventDate = this.data.event_start.toLocaleDateString();
    if (this.data.event_start.toLocaleDateString() != this.data.event_end.toLocaleDateString()) {
      this.eventDate += " - ";
      this.eventDate += this.data.event_end.toLocaleDateString();
    }

    // Populate time.
    this.eventTimes = this.data.event_start.toLocaleTimeString() + " - " + this.data.event_end.toLocaleTimeString();

    this.numberFilled = 0;
    this.numberWaitlistFilled = 0;
    this.loadComplete = false;
    this.myId = userService.getCurrentUserId();

    // Add a call to the event service to get the number of slots available.
    this.signupService.getSignupsForEvent(this.data.event_id).subscribe(res => {
      var waitCount: number = 0;
      var enrollCount: number = 0;
      console.log(res);
      console.log(res.length);
      for (let item of res) {
        console.log(item);
        console.log(this.myId)
        if (item.is_waitlisted) {
          waitCount++;
          if (item.user_id === this.myId) {
            this.currentlyWaitlisted = true;
            this.positionOnList = waitCount;
          }
        } else {
          enrollCount++;
          if (item.user_id === this.myId) {
            this.currentlyEnrolled = true;
          }
        }
      }
      this.numberFilled = enrollCount;
      this.numberWaitlistFilled = waitCount;
      this.loadComplete = true;
    });


  }

  /**
   * Closes dialog if pressing cancel.
   */
  onCancelClick(): void {
    this.dialogRef.close({event: 'cancel'});
  }

  /**
   * When you select the button to submit proof.
   */
  onProofClick(): void {
    // I have access to the event ID here. I need to allow the new dialog to access it.
    // This is used for the status.
    var resStatus: string = '';

    // Do an API call to find if the current user has provided proof for this event yet.
    // Get all of the proofs for the current event:
    this.loadComplete = false;
    this.attendanceService.getAllAttendanceForEvent(this.eventId).subscribe(result => {
      console.log(result);
      var attendMatch: AttendanceItem | null = null;
      // PULL THE CORRECT ONE IF PRESENT AND PASS IT ONWARDS.
      result.forEach((element: any) => {
        if (element.attendee_id === this.myId) {
          attendMatch = element;
        }
      });

      this.loadComplete = true;
      // Open dialog box.
      const proofDialogRef = this.dialog.open(ProofDialogComponent, {data: {eventId: this.eventId, eventName: this.data.event_name, attendance: attendMatch}});

      proofDialogRef.afterClosed().subscribe(result => {
        console.log(`Proof Dialog Result: ${result}`);
        if (result.event === 'cancel') {
          console.log('CANCELLED');
          this.dialogRef.close({event: 'No Changes Made to Proof.', status: resStatus})
        } else if (result.event === 'submitted') {
          console.log('SUBMITTED');
          if (attendMatch != null) {
            console.log('Do an update');
            this.attendanceService.updateAttendanceForEvent(this.eventId, attendMatch.event_attendance_id, result.data).pipe(catchError(rr => {
              return of([rr]);
            })).subscribe(item => {
              console.log(item);
              this.dialogRef.close({event: 'proofUpdated', status: resStatus})
            });
          } else {
            console.log('Create a new');
            this.attendanceService.submitAttendanceForEvent(this.eventId, result.data).pipe(catchError(rr => {
              return of([rr]);
            })).subscribe(item => {
              console.log(item);
              this.dialogRef.close({event: 'proofSubmitted', status: resStatus})
            });
          }
        }
      })
      // Shouldn't get here, but just in case.
      this.dialogRef.close({event: 'proofSubmitted', status: resStatus})
      });
  }

  /**
   * When you select to sign up or go on the waitlist.
   */
  onSignupClick(): void {
    // First, a variable for the status of the signup.
    var resStatus: string = '';

    // Open confirmation dialog.
    const confDialogRef = this.dialog.open(ConfirmDialogComponent, {data: this.data.event_name});

    confDialogRef.afterClosed().subscribe(result => {
      console.log(`Confirm Dialog Result: ${result}`);
      if (result) {
        // If yes, sends the request.
        this.signupService.signupForEvent(this.data.event_id).subscribe(res => {
          console.log(`The response for the signup is ${res}`);
          // I need to check if the signup was a success
          if (res.is_waitlisted) {
            resStatus = 'Waitlist';
          } else {
            resStatus = 'Success';
          }
          // This closes the dialog and sends a response.
          this.dialogRef.close({event: 'signup', status: resStatus})
        });

      } else {
        // If no, sets the status to canceled or calls canceled.
        resStatus = 'Canceled';
      }

      // This closes the dialog and sends a response.
      this.dialogRef.close({event: 'signup', status: resStatus})
    });
  }

  ngOnInit(): void {
  }

}
