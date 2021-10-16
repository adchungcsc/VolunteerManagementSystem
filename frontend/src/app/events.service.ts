import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


export interface EventItem {
  event_id: number;
  event_name: string;
  event_location: string;
  event_start: Date;
  event_end: Date;
  event_organizer: string
  event_organizer_email: string;
  event_max_volunteers: number;
  event_max_waitlist: number;
  event_description: string;
  event_credit: number;
  event_image: string;
}

@Injectable({
  providedIn: 'root'
})

/**
 * EventsServices handles REST APIs for the frontend to communicate with the server,
 * from the events endpoint.
 * Note - some code from this is based on code I wrote 
 */
export class EventsService {

  /** Where is the app running? */
	private apiBaseUrl = environment.host;

	/** Events Route */
	private eventsRoute = this.apiBaseUrl + '/api/v1/events/';

  constructor(private http: HttpClient) { }

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

  /** Error Handler - pulled from sample code */
	private handleAnyErrors(error: HttpErrorResponse): any {
		console.error(`Error from server with code ${error.status}, ` 
      + `${error.error['error']?.message}`);
		return throwError('Error: ' + `${error.error['error']?.message}`);
	}

  /**
   * Gets the event with a matching ID. GET api/v1/events/:id
   * @param id The ID of the event to get information.
   */
  getEvent(id: any): Observable<any> {
    // If not a valid ID/if null, error.
    if (!id) {
      throw new Error('Invalid ID');
    }
    
    // Returns the result or the error....
    return this.http.get(this.eventsRoute + id, this.httpOptions).pipe(
      catchError(this.handleAnyErrors)
    );
  }

  /**
   * Gets the event with a matching name. 
   * GET api/v1/events/?name=[name]
   * @param name The name of the event.
   */
  getEventByName(name: string): Observable<any> {
    // If not a valid string/if null, error.
    if (!name) {
      throw new Error('Invalid ID');
    }
    
    // Returns the result or the error....
    return this.http.get(this.eventsRoute + `?name=${name}`, this.httpOptions).pipe(
      catchError(this.handleAnyErrors)
    );
  }  

  // /**
  //  * Gets all events - calls GET api/v1/events
  //  * @param includePastEvents True if including those that already occurred.
  //  * @param skipToken The place to start when getting events.
  //  * @param maxToReturn The maximum number of itemss to return.
  //  * @returns response.
  //  */
  // getAllEvents(includePastEvents: boolean, skipToken?: number, maxToReturn?: number): Observable<any> {
  //   if (!skipToken) {
  //     skipToken = 0;
  //   }
  //   if (!maxToReturn) {
  //     maxToReturn = Number.MAX_SAFE_INTEGER;
  //   }

  //   // TODO ACCOUNT FOR tokens!
  //   // Returns the result or the error...
  //   return this.http.get(this.eventsRoute, this.httpOptions).pipe(
  //     catchError(this.handleAnyErrors)
  //   );
  // }

    /**
   * Gets all events - calls GET api/v1/events
   * @param includePastEvents True if including those that already occurred. (true if empty)
   * @param skipToken The place to start when getting events. First page (0) if not specified.
   * @param maxToReturn The maximum number of itemss to return. Default to five.
   * @param filter The string to filter (searches).
   * @returns response.
   */
     getAllEvents(includePastEvents = true, skipToken = 0, maxToReturn = 5, filter = ''): Observable<any> {
      if (!skipToken) {
        skipToken = 0;
      }
      if (!maxToReturn) {
        maxToReturn = Number.MAX_SAFE_INTEGER;
      }
      if (!filter) {
        filter = '';
      }


  
      // Returns the result or the error...
      let results = this.http.get(this.eventsRoute, {
        headers: this.httpHeaders,
        params: new HttpParams()
          .set('filter', filter)
          .set('includePastEvents', includePastEvents)
          .set('skipToken', skipToken.toString())
          .set('pageSize', maxToReturn.toString())
      }).pipe(
        catchError(this.handleAnyErrors)
      );

      // results.forEach(result => {
      //   result["spaghetti"] = "spaghet";
      // })

      // arr: any = [];

      // console.log("results");
      // console.log(results);
      // console.log("results body");
      // console.log(results.subscribe(item => {
      //   for (const d of (item as any)) {
      //     this.arr.push({
      //       {

      //       }
      //     })
      //   }
      // }));

      return results;
    }

  /**
   * Deletes the event specified.
   * @param id The ID of the event to delete.
   * @returns response.
   */
  deleteEvent(id: any): Observable<any> {
    // If no valid ID, error.
    if (!id) {
      throw new Error('No valid ID provided');
    }

    // delete the matching ID.
    return this.http.delete(this.eventsRoute + id, this.httpOptions).pipe(
      catchError(this.handleAnyErrors)
    );
  }

  // TODO NEED TO ADD ABILITY TO CREATE AN EVENT AND UPDATE AN EVENT.
}
