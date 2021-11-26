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

const routes: Routes = [
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
  { path: 'landing', component: LandingPageComponent },
  { path: 'log-in', component: LogInPageComponent},
  { path: 'home', component: HomePageComponent},
  { path: 'find-event', component: FindAnEventComponent},
  { path: 'my-events', component: MyEventsPageComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'create-event', component: CreateEventPageComponent},
  { path: 'manage-event', component: ManageEventComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
