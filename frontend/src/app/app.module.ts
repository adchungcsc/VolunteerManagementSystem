import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatPaginatorModule} from '@angular/material/paginator';
// import { MatProgressSpinner } from "@angular/material/progress-spinner";
import {MatTableModule} from '@angular/material/table';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatDialogModule} from '@angular/material/dialog';


import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EventCardComponent } from './event-card/event-card.component';
import { FindAnEventComponent } from './find-an-event/find-an-event.component';
import { DetailsDialogComponent } from './details-dialog/details-dialog.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { FindEventPageComponent } from './find-event-page/find-event-page.component';
import { MyEventsPageComponent } from './my-events-page/my-events-page.component';
import { EventAdminPageComponent } from './event-admin-page/event-admin-page.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LogInPageComponent } from './log-in-page/log-in-page.component';
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    EventCardComponent,
    FindAnEventComponent,
    DetailsDialogComponent,
    DashboardPageComponent,
    FindEventPageComponent,
    MyEventsPageComponent,
    EventAdminPageComponent,
    NavBarComponent,
    LogInPageComponent,
    SignUpPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatPaginatorModule,
    // MatProgressSpinner,
    MatTableModule,
    FlexLayoutModule,
    MatDialogModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
