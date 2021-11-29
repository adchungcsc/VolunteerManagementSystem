import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LogInPageComponent } from './log-in-page/log-in-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MyEventsPageComponent } from './my-events-page/my-events-page.component';
import { CreateEventPageComponent } from "./create-event-page/create-event-page.component";
import { FindAnEventComponent } from './find-an-event-page/find-an-event.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MsalGuard } from '@azure/msal-angular';
import { ManageEventComponent } from './manage-event/manage-event.component';
import { AuthGuardService } from './auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
  { path: 'landing', component: LandingPageComponent},
  { path: 'log-in', component: LogInPageComponent},
  { path: 'home', component: HomePageComponent, canActivate: [AuthGuardService] },
  { path: 'find-event', component: FindAnEventComponent, canActivate: [AuthGuardService]},
  { path: 'my-events', component: MyEventsPageComponent, canActivate: [AuthGuardService]},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService]},
  { path: 'create-event', component: CreateEventPageComponent, canActivate: [AuthGuardService]},
  { path: 'manage-event', component: ManageEventComponent, canActivate: [AuthGuardService]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
