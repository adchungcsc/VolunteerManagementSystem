import { Component, OnInit } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { EventsService } from '../events.service';
import { EventItem, EventsDataSource } from '../find-an-event-page/events-datasource';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';

const GRAPH_ENDPOINT = 'https://graph.microsoft.com/v1.0/me';

type ProfileType = {
  givenName?: string,
  surname?: string,
  userPrincipalName?: string,
  id?: string
}

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
  /**
   * Headers used for ease
   */
    httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  });

  /** Http Options - pulled from prior sample code */
  httpOptions = {
    headers: this.httpHeaders
  }

  private apiBaseUrl = environment.host;
  // TODO: get current user id
  private userId = 1;
  userHoursTotal = 0;
  userEventsTotal = 0;
  private userEventsRoute = this.apiBaseUrl + '/api/v1/attend/user/' + this.userId;

  // TODO IMPORT USERS SERVICE
  constructor(
    private eventsService: EventsService,
    private http: HttpClient
    ) { }

  private handleAnyErrors(error: HttpErrorResponse): any {
    console.error(`Error from server with code ${error.status}, ` 
      + `${error.error['error']?.message}`);
    return throwError('Error: ' + `${error.error['error']?.message}`);
  }

  ngOnInit(): void {
    this.getProfile();
    // TODO
    this.dataSource = new EventsDataSource(this.eventsService);

    // CollectionViewer a = new CollectionViewer();

    this.dataSourceInfo = this.dataSource.connect(this);
    // TODO increase page size.
    this.dataSource.loadEvents(true, '', 0, 10);

    let events = this.http.get(this.userEventsRoute, this.httpOptions).pipe(
      catchError(this.handleAnyErrors)
    );
    events.forEach((e: any) => {
      let event:any = Object.values(e);
      this.userHoursTotal += event[0].hours;
      this.userEventsTotal++;
    })
  }

  getProfile() {
    this.http.get(GRAPH_ENDPOINT)
      .subscribe(profile => {
        this.profile = profile;
      });
  }

}
