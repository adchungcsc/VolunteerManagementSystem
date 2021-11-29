import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {observable, Observable, throwError} from 'rxjs';
import {environment} from 'src/environments/environment';
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  /** Where is the app running? */
  private apiBaseUrl = environment.host;

  /** User Route */
  private usersRoute = this.apiBaseUrl + '/api/v1/user/';

  private user_id = 0;

  constructor(private http: HttpClient) {
  }

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

  // Not reliable, but gets the current User ID.
  getCurrentUserId(): number {
    if (this.user_id !== 0) {
      return this.user_id;
    }

    //users api returns array size 1
    let results = this.http.get(this.usersRoute, this.httpOptions).pipe(
      catchError(this.handleAnyErrors)
    );
    results.subscribe((res: any) => {
      this.user_id = res[0].user_id
    })

    return this.user_id
  }

  /**
   * Gets the current user information.
   * @returns the User in a one element array observable.
   */
  getCurrentUser(): Observable<any> {
    //users api returns array size 1
    let results = this.http.get(this.usersRoute, this.httpOptions).pipe(
      catchError(this.handleAnyErrors)
    );
    return results;
  }

  /**
   * Gets user from ID.
   * @param id The ID of the user to find.
   * @returns Observable
   */
  getUserObjectFromId(id: number): Observable<any> {
    return this.http.get(this.usersRoute + id, this.httpOptions).pipe(
      catchError(this.handleAnyErrors)
    );
  }

  /**
   * Gets and returns all users in an Observable.
   */
  getAllUsers(): Observable<any> {
    return this.http.get(this.usersRoute + 'organization', this.httpOptions).pipe(
      catchError(this.handleAnyErrors)
    );
  }

  /**
   * Basically checks the login Auth.
   * This doesn't use the Users Route but made sense in the Users service.
   */
  checkLoginAuth(): Observable<any> {
    return this.http.get(this.apiBaseUrl + '/api/v1/protected', this.httpOptions).pipe(
      catchError(this.handleAnyErrors)
    );
  }

}
