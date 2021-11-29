import {Component, OnInit} from '@angular/core';
import { AuthGuardService } from '../auth-guard.service';

@Component({
  selector: 'google-login',
  templateUrl: './microsoft-login.component.html',
  styleUrls: ['./microsoft-login.component.css']
})
export class MicrosoftLoginComponent implements OnInit {

  displaySpinner: boolean = true;

  // Basic constructor
  constructor(private authService: AuthGuardService) { }

  ngOnInit() {
    this.displaySpinner = true;

    if (!this.authService.validUser) {
      this.signInWithAzureAd();
    } else {
      this.displaySpinner = false;
    }

  }

  signInWithAzureAd(): void {
    window.location.replace(`/api/v1/auth/azureadoauth2`)
  }

  testProtectedApiEndpoint(): void {
    // This console log is left intentionally.
    fetch(`/api/v1/user`).then(response => console.log(response))
  }

  signOut(): void {
    // This console log is left intentionally.
    this.authService.signOutUser();
    fetch(`/api/v1/logout`).then(() => console.log("Logged Out"))
  }

}
