import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DeleteConfirmDialogComponent } from '../delete-confirm-dialog/delete-confirm-dialog.component';
import { DetailsDialogComponent } from '../details-dialog/details-dialog.component';
import { EventItem, EventsService } from '../events.service';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css']
})
export class EventCardComponent implements OnInit {

  // The eventItem is passed in.
  @Input() eventItem?: EventItem;

  // Additional information.
  eventDate: string;
  eventTimes: string;
  eventImage: string;


  /**
   * Constructs elements needed for the event card to function.
   */
  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar, private eventService: EventsService) { 

    this.eventDate = "Placeholder";
    this.eventTimes = "Now";
    this.eventImage = "Random";

   }

  /**
   * Sets up the event card.
   */
  ngOnInit(): void {
    if (this.eventItem) {
      // If the event item is present (it should be), get info from it.
      // Populate date
      this.eventDate = this.eventItem.event_start.toLocaleDateString();
      if (this.eventItem.event_start.toLocaleDateString() != this.eventItem.event_end.toLocaleDateString()) {
        this.eventDate += " - ";
        this.eventDate += this.eventItem.event_end.toLocaleDateString();
      }
      // Populate time.
      this.eventTimes = this.eventItem.event_start.toLocaleTimeString() + " - " + this.eventItem.event_end.toLocaleTimeString();

      // If no image.
      if (!this.eventItem.event_image || this.eventItem.event_image === '' || this.eventItem.event_image === '/') {
        // Set to placeholder image.
        this.eventItem.event_image = "https://brand.ncsu.edu/img/logo/brick2x2.jpg";
        this.eventImage = "https://brand.ncsu.edu/img/logo/brick2x2.jpg";
      } else {
        this.eventImage = this.eventItem.event_image;
      }

    }
  }

  // Opens the details dialog.
  openDialog() {
    const dialogRef = this.dialog.open(DetailsDialogComponent, {data: this.eventItem});

    dialogRef.afterClosed().pipe(catchError(err => {
      this.openSnackBar(`Error: ${err}`);
      return of([err]);
    })).subscribe(result => {
      if (result != undefined) {
        console.log(`Dialog result: ${result}`);
        if (result.event === 'signup') {
          this.openSnackBar(`Event Sign-up Status: ${result.status}`);
        } else if (result.event === 'proofSubmitted') {
          this.openSnackBar(`Event Attendance Status: ${result.status}`);
        }
      }
    });
  }

  // Deletes the event.
  deleteThisEvent(event: any) {
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {data: {eventName: this.eventItem?.event_name, currentUser: ''}});

    dialogRef.afterClosed().pipe(catchError(err => {
      this.openSnackBar(`Error: ${err}`);
      return of([err]);
    })).subscribe(result => {
      console.log(`The Result of the confirmation is ${result}`);
      if (result) {
        // If yes, sends the request.
        this.eventService.deleteEvent(this.eventItem?.event_id).pipe(catchError(err => {
          this.openSnackBar(`Error: ${err}`);
          console.log("Error with deleting event");
          return of([err]);
        })).subscribe(res => {
          console.log(`The response for the event deletion is ${res.toString()}`);
          console.log(`Error may be ${res[0]}`);
          console.log(res);
          this.openSnackBar("Event Deleted.");
        });

      } else {
        this.openSnackBar("Deletion cancelled.");
      }
    });
  }

  // Opens a snackbar with a message
  openSnackBar(message: string) {
    this._snackBar.open(message, undefined, {duration: 3000});
  }

}
