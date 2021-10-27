import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EventsService } from '../events.service';
import { EventItem, EventsDataSource } from '../find-an-event-page/events-datasource';

@Component({
  selector: 'app-my-events-page',
  templateUrl: './my-events-page.component.html',
  styleUrls: ['./my-events-page.component.css']
})
export class MyEventsPageComponent implements OnInit {

  name = "World";
  dataSource!: EventsDataSource;

  now = new Date();
  item2 = new Date();
  aWeekAgo = new Date(this.item2.setDate(this.now.getDate() - 7));

  dataSourceInfo!: Observable<EventItem[]>;

  viewChange: any;

  // TODO IMPORT USERS SERVICE
  constructor(private eventsService: EventsService) { }

  ngOnInit(): void {
    // TODO
    this.dataSource = new EventsDataSource(this.eventsService);

    // CollectionViewer a = new CollectionViewer();

    this.dataSourceInfo = this.dataSource.connect(this);
    // TODO increase page size.
    this.dataSource.loadEvents(true, '', 0, 10);
  }

}
