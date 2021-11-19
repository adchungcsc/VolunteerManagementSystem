import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LogInPageComponent } from './log-in-page/log-in-page.component';
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { MyEventsPageComponent } from './my-events-page/my-events-page.component';
import { ReportsPageComponent } from './reports-page/reports-page.component';
import { CreateEventPageComponent } from "./create-event-page/create-event-page.component";
import { FindAnEventComponent } from './find-an-event-page/find-an-event.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MsalGuard } from '@azure/msal-angular';

const routes: Routes = [
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
  { path: 'landing', component: LandingPageComponent },
  { path: 'log-in', component: LogInPageComponent, canActivate: [MsalGuard] },
  { path: 'sign-up', component: SignUpPageComponent, canActivate: [MsalGuard] },
  { path: 'home', component: DashboardPageComponent, canActivate: [MsalGuard] },
  { path: 'find-event', component: FindAnEventComponent, canActivate: [MsalGuard] },
  { path: 'my-events', component: MyEventsPageComponent, canActivate: [MsalGuard] },
  { path: 'reports', component: ReportsPageComponent, canActivate: [MsalGuard] },
  { path: 'create-event', component: CreateEventPageComponent, canActivate: [MsalGuard] },
  { path: 'dashboard', component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
