import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventItem } from '../events.service';

@Component({
  selector: 'app-details-dialog',
  templateUrl: './details-dialog.component.html',
  styleUrls: ['./details-dialog.component.css']
})
export class DetailsDialogComponent implements OnInit {

  eventDate: string;
  eventTimes: string;
  numberFilled: number;
  numberWaitlistFilled: number;

  constructor(@Inject (MAT_DIALOG_DATA) public data: EventItem) { 
    this.eventDate = this.data.event_start.toLocaleDateString();
    if (this.data.event_start.toLocaleDateString() != this.data.event_end.toLocaleDateString()) {
      this.eventDate += " - ";
      this.eventDate += this.data.event_end.toLocaleDateString();
    }

    // Populate time.
    this.eventTimes = this.data.event_start.toLocaleTimeString() + " - " + this.data.event_end.toLocaleTimeString();

    // TODO add a call to the event service to get the number of slots available.
    this.numberFilled = 5;
    this.numberWaitlistFilled = 0;
    
  }

  ngOnInit(): void {
  }

}
