import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LogInPageComponent } from './log-in-page/log-in-page.component';
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { FindEventPageComponent } from './find-event-page/find-event-page.component';
import { MyEventsPageComponent } from './my-events-page/my-events-page.component';
import { EventAdminPageComponent } from './event-admin-page/event-admin-page.component';
import { ReportsPageComponent } from './reports-page/reports-page.component';

const routes: Routes = [
  // TODO: redirect to dashboard if user is logged in
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
  { path: 'landing', component: LandingPageComponent },
  { path: 'log-in', component: LogInPageComponent },
  { path: 'sign-up', component: SignUpPageComponent },
  { path: 'dashboard', component: DashboardPageComponent },
  { path: 'find-event', component: FindEventPageComponent },
  { path: 'my-events', component: MyEventsPageComponent },
  { path: 'event-admin', component: EventAdminPageComponent },
  { path: 'reports', component: ReportsPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
