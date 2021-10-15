import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { FindEventPageComponent } from './find-event-page/find-event-page.component';
import { MyEventsPageComponent } from './my-events-page/my-events-page.component';
import { EventAdminPageComponent } from './event-admin-page/event-admin-page.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LogInPageComponent } from './log-in-page/log-in-page.component';
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';
import { ReportsPageComponent } from './reports-page/reports-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    DashboardPageComponent,
    FindEventPageComponent,
    MyEventsPageComponent,
    EventAdminPageComponent,
    NavBarComponent,
    LogInPageComponent,
    SignUpPageComponent,
    ReportsPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
