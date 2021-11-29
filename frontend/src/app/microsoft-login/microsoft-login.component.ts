import {Component, OnInit} from '@angular/core';
import { AuthGuardService } from '../auth-guard.service';

// import {SocialAuthService} from 'angularx-social-login';
// import {SocialUser} from 'angularx-social-login';
// import {GoogleLoginProvider} from 'angularx-social-login';


@Component({
  selector: 'google-login',
  templateUrl: './microsoft-login.component.html',
  styleUrls: ['./microsoft-login.component.css']
})
export class MicrosoftLoginComponent implements OnInit {

  displaySpinner: boolean = true;

  // user: SocialUser | undefined;
  //
  constructor(private authService: AuthGuardService) {

  }

  ngOnInit() {
    this.displaySpinner = true;

    // this.authService.canActivate().then(() => {
      if (!this.authService.validUser) {
        this.signInWithAzureAd();
      } else {
        this.displaySpinner = false;
      }
    // }).catch(() => {
      // this.signInWithAzureAd();
    // });

  }

  signInWithAzureAd(): void {
    // this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(x => {
    //   console.log(x.name)
    // });
    window.location.replace(`/api/v1/auth/azureadoauth2`)

    // window.open('/api/v1/auth/azureadoauth2',"mywindow","location=1,status=1,scrollbars=1, width=800,height=800");
    // window.addEventListener('message', (message) => {
    //   //message will contain facebook user and details
    //   console.log(message)
    // });

  }

  testProtectedApiEndpoint(): void {
    // TEST
    fetch(`/api/v1/user`).then(response => console.log(response))
    // .then(data => console.log(data));
  }

  signOut(): void {
    this.authService.signOutUser();
    fetch(`/api/v1/logout`).then(() => console.log("Logged Out"))
    // this.authService.signOut().then(r => console.log(r));
  }

}
