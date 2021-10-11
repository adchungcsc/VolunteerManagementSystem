import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

/**
 * EventsServices handles REST APIs for the frontend to communicate with the server,
 * from the events endpoint.
 */
export class EventsService {

  /** Our local url */
	private apiUrl = environment.host;

	/** Events Route */
	private eventsRoute = this.apiUrl + '/api/v1/events/';

  constructor(private http: HttpClient) { }

  /** Http Options - pulled from prior sample code */
	httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*'
		})
	}

  /** Error Handler - pulled from sample code */
	private handleError(error: HttpErrorResponse): any {
		console.error(`Server Error returned code ${error.status}, ` + `${error.error['error']?.message}`);
		return throwError('Server Error: ' + `${error.error['error']?.message}`);
	}

  /**
   * Gets all events 
   * @param includePastEvents True if including those that already occurred.
   * @param skipToken The place to start when getting events.
   * @param maxToReturn The maximum number of itemss to return.
   * @returns response.
   */
  getAllEvents(includePastEvents: boolean, skipToken?: number, maxToReturn?: number): Observable<any> {
    if (!skipToken) {
      skipToken = 0;
    }
    if (!maxToReturn) {
      maxToReturn = Number.MAX_SAFE_INTEGER;
    }

    return this.http.get(this.eventsRoute, this.httpOptions).pipe(
      catchError(this.handleError)
    );

  }
}
