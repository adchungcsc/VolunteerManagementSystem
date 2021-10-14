import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css']
})
export class EventCardComponent implements OnInit {

  eventName: string;
  eventDate: string;
  eventTimes: string;
  eventImage: string;


  // TODO NEED TO INJECT and work on this.
  /**
   * TODO
   * @param data TODO
   */
  constructor(/*public data: any*/) { 

    // TODO REMOVE
    this.eventName = "Hi";
    this.eventDate = "Today";
    this.eventTimes = "Now";
    this.eventImage = "Random";

   }

  ngOnInit(): void {
  }

}
