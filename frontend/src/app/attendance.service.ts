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


  /**
   * Gets attendance for the event ID provided.
   * @param eventId The ID of the event to get
   */
  getAllAttendanceForEvent(eventId: number): Observable<any> {
    // If not a valid ID/if null, error.
    if ((eventId == undefined || eventId == null) && eventId !== 0) {
      throw new Error('Invalid Event ID');
    }

    // Returns the result or the error....
    let results = this.http.get(this.attendanceRoute + 'event/' + eventId, this.httpOptions).pipe(
      catchError(this.handleAnyErrors)
    );

    return results;
  }


  /**
   * Gets all attendance for events.
   * @param userId The User ID to use when getting attendance logs.
   */
  getAllAttendanceForUser(userId: number): Observable<any> {
    // If not a valid ID/if null, error.
    if ((userId == undefined || userId == null) && userId !== 0) {
      throw new Error('Invalid User ID');
    }

    // Returns the result or the error....
    let results = this.http.get(this.attendanceRoute + 'user/' + userId, this.httpOptions).pipe(
      catchError(this.handleAnyErrors)
    );

    return results;
  }


  /**
   * Submits the proof into the event.
   * @param eventId The Id of the event.
   * @param data The Contents of the form (description).
   */
   submitAttendanceForEvent(eventId: number, data: any): Observable<any> {
    if ((eventId == undefined || eventId == null) && eventId !== 0) {
      throw new Error('Invalid ID');
    }

    // Removed EventID from the post path.
    return this.http.post(this.attendanceRoute, JSON.stringify(data), this.httpOptions).pipe(
      catchError(this.handleAnyErrors)
    );
  }

    /**
   * Submits the proof into the event.
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
  
      return this.http.put(this.attendanceRoute + attendanceId, JSON.stringify(data), this.httpOptions).pipe(
        catchError(this.handleAnyErrors)
      );
    }

}

