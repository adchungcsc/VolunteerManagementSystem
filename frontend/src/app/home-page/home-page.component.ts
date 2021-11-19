import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

const GRAPH_ENDPOINT = 'https://graph.microsoft.com/v1.0/me';

type ProfileType = {
  givenName?: string,
  surname?: string,
  userPrincipalName?: string,
  id?: string
}

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  profile!: ProfileType;
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
  private userEventsRoute = this.apiBaseUrl + '/api/v1/attend/user/' + this.userId;

  constructor(private http: HttpClient) { }

	private handleAnyErrors(error: HttpErrorResponse): any {
		console.error(`Error from server with code ${error.status}, ` 
      + `${error.error['error']?.message}`);
		return throwError('Error: ' + `${error.error['error']?.message}`);
	}

  ngOnInit(): void {
    let events = this.http.get(this.userEventsRoute, this.httpOptions).pipe(
      catchError(this.handleAnyErrors)
    );
    events.forEach((e: any) => {
      let event:any = Object.values(e);
      this.userHoursTotal += event[0].hours;
    })
    this.getProfile();
  }

  getProfile() {
    this.http.get(GRAPH_ENDPOINT)
      .subscribe(profile => {
        this.profile = profile;
      });
  }

}
