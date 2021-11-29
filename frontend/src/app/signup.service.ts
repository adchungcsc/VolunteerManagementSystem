import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

/**
 * Represents what is returned from signup Service.
 */
export interface SignupItem {
  event_id: number;
  event_signup_id: number;
  is_waitlisted: boolean;
  user_id: number;
  waitlist_timestamp: any;
}

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  /** Where is the app running? */
	private apiBaseUrl = environment.host;

	/** Signup Route */
	private signupRoute = this.apiBaseUrl + '/api/v1/signup/';

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
   * Gets the event with a matching ID. GET api/v1/signup/event/:id
   * @param eventId The ID of the event to get information.
   */
  getSignupsForEvent(eventId: number): Observable<any> {
    // If not a valid ID/if null, error.
    console.log("the ID is " + eventId);
    if ((eventId == undefined || eventId == null) && eventId !== 0) {
      throw new Error('Invalid ID');
    }
    
    // Returns the result or the error....
    let results = this.http.get(this.signupRoute + 'event/' + eventId, this.httpOptions).pipe(
      catchError(this.handleAnyErrors)
    );

    // TODO REMOVE
    console.log(results);

    return results;
  }

  /**
   * Finds all of the events a user has signed up.
   * @param userId The User ID to find events
   */
  getEventSignupsForUser(userId: number): Observable<any> {
    if ((userId == undefined || userId == null) && userId !== 0) {
      throw new Error('Invalid ID');
    }

    // Returns the result or the error...
    let results = this.http.get(this.signupRoute + 'user/' + userId, {
      headers: this.httpHeaders,
    }).pipe(
      catchError(this.handleAnyErrors)
    );

    return results;
  }

  /**
   * Enrolls the current volunteer into the event.
   * TODO SHOULD WE ALSO PROVIDE THE USER ID?
   * @param eventId The Id of the event.
   */
  signupForEvent(eventId: number): Observable<any> {
    if ((eventId == undefined || eventId == null) && eventId !== 0) {
      throw new Error('Invalid ID');
    }
    return this.http.post(this.signupRoute, {'eventId': eventId}, this.httpOptions).pipe(
      catchError(this.handleAnyErrors)
    );
  }

  /**
   * Deletes a signup with the matching ID.
   * @param eventSignupId The ID of the signup to delete
   * @returns Confirmation the signup was deleted
   */
  deleteSignup(eventSignupId: number): Observable<any> {
    if ((eventSignupId == undefined || eventSignupId == null) && eventSignupId !== 0) {
      throw new Error('Invalid ID');
    }

    return this.http.delete(this.signupRoute + eventSignupId, this.httpOptions).pipe(
      catchError(this.handleAnyErrors)
    );
  }
}
