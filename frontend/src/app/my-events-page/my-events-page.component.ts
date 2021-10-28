import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EventsService } from '../events.service';
import { EventItem, EventsDataSource } from '../find-an-event-page/events-datasource';
import { HttpClient } from '@angular/common/http';

const GRAPH_ENDPOINT = 'https://graph.microsoft.com/v1.0/me';

type ProfileType = {
  givenName?: string,
  surname?: string,
  userPrincipalName?: string,
  id?: string
}

// type ProfileType = {
//   name?: string,
//   totalEvents?: number,
//   totalHours?: number
// }

@Component({
  selector: 'app-my-events-page',
  templateUrl: './my-events-page.component.html',
  styleUrls: ['./my-events-page.component.css']
})
export class MyEventsPageComponent implements OnInit {
  profile!: ProfileType;

  dataSource!: EventsDataSource;

  now = new Date();
  item2 = new Date();
  aWeekAgo = new Date(this.item2.setDate(this.now.getDate() - 7));

  dataSourceInfo!: Observable<EventItem[]>;

  viewChange: any;

  // TODO IMPORT USERS SERVICE
  constructor(
    private eventsService: EventsService,
    private http: HttpClient
    ) { }

  ngOnInit(): void {
    this.getProfile();
    // TODO
    this.dataSource = new EventsDataSource(this.eventsService);

    // CollectionViewer a = new CollectionViewer();

    this.dataSourceInfo = this.dataSource.connect(this);
    // TODO increase page size.
    this.dataSource.loadEvents(true, '', 0, 10);
  }

  getProfile() {
    this.http.get(GRAPH_ENDPOINT)
      .subscribe(profile => {
        this.profile = profile;
      });
  }

}
