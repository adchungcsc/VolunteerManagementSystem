import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  // Is the user valid (have they signed in yet?)
  public validUser: boolean = false;

  constructor(private usersService: UsersService, public router: Router) { }

  // This defines what is allowed (if we can go to a page)
  async canActivate(): Promise<boolean> {
    // Basically, I need to call the API route. If it doesn't work, then redirect.
    await new Promise(resolve => {
      this.usersService.checkLoginAuth().pipe(catchError(e => {
        this.router.navigate(['log-in']);
        this.validUser = false;
        return of([e]);
      }))
      .subscribe((response) => {
        if (response) {
          this.validUser = (response != 0);
        }
        resolve(response != 0);
      })
    });
    
    return this.validUser;
  }

  signOutUser() {
    this.validUser = false;
  }
}
