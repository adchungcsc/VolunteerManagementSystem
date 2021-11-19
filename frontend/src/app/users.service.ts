import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { observable, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

    /** Where is the app running? */
	private apiBaseUrl = environment.host;

	/** User Route */
	private usersRoute = this.apiBaseUrl + '/api/v1/user/';

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

  getCurrentUserId(): number {
    // TODO WRITE THIS
    return 1;
  }

}
