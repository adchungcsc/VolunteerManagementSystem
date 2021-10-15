import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EventsService } from '../events.service';
import { EventItem, EventsDataSource } from './events-datasource';
import { CollectionViewer } from "@angular/cdk/collections";

@Component({
  selector: 'app-find-an-event',
  templateUrl: './find-an-event.component.html',
  styleUrls: ['./find-an-event.component.css']
})
export class FindAnEventComponent implements OnInit {

  dataSource!: EventsDataSource;

  dataSourceInfo!: Observable<EventItem[]>;

  viewChange: any;

  constructor(private eventsService: EventsService) { }

  ngOnInit(): void {
    this.dataSource = new EventsDataSource(this.eventsService);

    // CollectionViewer a = new CollectionViewer();

    this.dataSourceInfo = this.dataSource.connect(this);
    // TODO increase page size.
    this.dataSource.loadEvents('', 0, 10);

    console.log('view change');
    console.log(this.viewChange);
    console.log('datasourceinfo');
    console.log(this.dataSourceInfo);
  }

}
