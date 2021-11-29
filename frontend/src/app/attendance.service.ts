import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export interface AttendanceItem {
  event_attendance_id: number;
  event_id: number;
  hours: number;
  comment: string;
  rating: number;
  attendee_id: number;
}

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  /** Where is the app running? */
	private apiBaseUrl = environment.host;

	/** Attendance Route */
	private attendanceRoute = this.apiBaseUrl + '/api/v1/attend/';

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



  // TODO REMOVE DOES NOT WORK.
  /**
   * Gets the attendance for the specific user and event provided.
   * @param eventId The ID of the event to get attendance.
   * @param userId The user ID for the user to get their attendance for the event, or empty if current user.
   */
  getSpecificUserAttendanceForEvent(eventId: number, userId?: number): Observable<any> {

    // If not a valid ID/if null, error.
    console.log("the ID is " + eventId);
    if ((eventId == undefined || eventId == null) && eventId !== 0) {
      throw new Error('Invalid Event ID');
    }

    // If not provided, get for current user.
    // TODO ON BACKEND THE API SHOULD ONLY ALLOW USER TO GET THEIR OWN IF NOT ADMIN.
    if ((userId == undefined || userId == null) && userId !== 0) {
      // then assign it to be the current user.
      userId = /* TODO ADD REAL USER ID HERE */ 1;
    }
    
    // Returns the result or the error....
    let results = this.http.get(this.attendanceRoute + 'event/' + eventId + '/' + userId, this.httpOptions).pipe(
      catchError(this.handleAnyErrors)
    );

    // TODO REMOVE
    console.log(results);

    return results;
  }


  /**
   * Gets attendance for the event ID provided.
   * @param eventId The ID of the event to get
   */
  getAllAttendanceForEvent(eventId: number): Observable<any> {
    // If not a valid ID/if null, error.
    console.log("the ID is " + eventId);
    if ((eventId == undefined || eventId == null) && eventId !== 0) {
      throw new Error('Invalid Event ID');
    }

    // Returns the result or the error....
    let results = this.http.get(this.attendanceRoute + 'event/' + eventId, this.httpOptions).pipe(
      catchError(this.handleAnyErrors)
    );

    // TODO REMOVE
    console.log(results);

    return results;
  }


  // TODO NEED TO ACCOUNT FOR POTENTIALLY NOT NUMBER FOR USER ID.
  // ALSO, WE MIGHT NOT WANT TO GET THE IMAGES - EITHER A LINK or a set of links to make other calls is fine.
  /**
   * Gets all attendance for events.
   * @param userId The User ID to use when getting attendance logs.
   */
  getAllAttendanceForUser(userId: number): Observable<any> {
    // If not a valid ID/if null, error.
    console.log("the ID is " + userId);
    if ((userId == undefined || userId == null) && userId !== 0) {
      throw new Error('Invalid User ID');
    }

    // Returns the result or the error....
    let results = this.http.get(this.attendanceRoute + 'user/' + userId, this.httpOptions).pipe(
      catchError(this.handleAnyErrors)
    );

    // TODO REMOVE
    console.log(results);

    return results;
  }

  // /**
  //  * Enrolls the current volunteer into the event.
  //  * TODO SHOULD WE ALSO PROVIDE THE USER ID?
  //  * @param eventId The Id of the event.
  //  * @param formData The Contents of the form (image, description).
  //  */
  //  submitAttendanceForEvent(eventId: number, formData: FormData): Observable<any> {
  //   if ((eventId == undefined || eventId == null) && eventId !== 0) {
  //     throw new Error('Invalid ID');
  //   }
  //   return this.http.post(this.attendanceRoute, {'eventId': eventId, 'formData': formData}, this.httpOptions).pipe(
  //     catchError(this.handleAnyErrors)
  //   );
  // }

  /**
   * Submits the proof into the event.
   * TODO SHOULD WE ALSO PROVIDE THE USER ID?
   * @param eventId The Id of the event.
   * @param data The Contents of the form (description).
   */
   submitAttendanceForEvent(eventId: number, data: any): Observable<any> {
    if ((eventId == undefined || eventId == null) && eventId !== 0) {
      throw new Error('Invalid ID');
    }

    console.log(data);
    console.log(JSON.stringify(data));

    // Removed EventID from the post path.
    return this.http.post(this.attendanceRoute, JSON.stringify(data), this.httpOptions).pipe(
      catchError(this.handleAnyErrors)
    );
  }

    /**
   * Submits the proof into the event.
   * TODO SHOULD WE ALSO PROVIDE THE USER ID?
   * @param eventId The Id of the event.
   * @param data The Contents of the form (description).
   */
     updateAttendanceForEvent(eventId: number, attendanceId: number, data: any): Observable<any> {
      if ((eventId == undefined || eventId == null) && eventId !== 0) {
        throw new Error('Invalid ID');
      }

      if ((attendanceId == undefined || attendanceId == null) && attendanceId !== 0) {
        throw new Error('Invalid ID');
      }
  
      console.log(data);
      console.log(JSON.stringify(data));
  
      return this.http.put(this.attendanceRoute + eventId + '/' + attendanceId, JSON.stringify(data), this.httpOptions).pipe(
        catchError(this.handleAnyErrors)
      );
    }

}

