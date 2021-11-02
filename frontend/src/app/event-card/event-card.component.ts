import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DetailsDialogComponent } from '../details-dialog/details-dialog.component';
import { EventItem } from '../events.service';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css']
})
export class EventCardComponent implements OnInit {

  
  @Input() eventItem?: EventItem;

  eventDate: string;
  eventTimes: string;
  eventImage: string;


  // TODO NEED TO INJECT and work on this.
  /**
   * TODO
   * @param data TODO
   */
  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar) { 

    // TODO REMOVE
    this.eventDate = "Placeholder";
    this.eventTimes = "Now";
    this.eventImage = "Random";

   }

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
      if (!this.eventItem.event_image || this.eventItem.event_image === '') {
        // TODO Set to placeholder image.
        this.eventImage = "https://brand.ncsu.edu/img/logo/brick2x2.jpg";
      } else {
        this.eventImage = this.eventItem.event_image;
      }

    }
  }


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
        }
      }
    });
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, undefined, {duration: 3000});
  }

}
