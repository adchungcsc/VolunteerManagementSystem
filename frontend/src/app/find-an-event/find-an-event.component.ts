import { Component, OnInit } from '@angular/core';
import { EventsService } from '../events.service';
import { EventsDataSource } from './events-datasource';

@Component({
  selector: 'app-find-an-event',
  templateUrl: './find-an-event.component.html',
  styleUrls: ['./find-an-event.component.css']
})
export class FindAnEventComponent implements OnInit {

  dataSource!: EventsDataSource;

  constructor(private eventsService: EventsService) { }

  ngOnInit(): void {
    this.dataSource = new EventsDataSource(this.eventsService);
    // TODO increase page size.
    this.dataSource.loadEvents('', 0, 10);
  }

}
