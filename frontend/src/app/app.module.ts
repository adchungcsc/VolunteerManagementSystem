import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

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
import { FindAnEventComponent } from './find-an-event-page/find-an-event.component';
import { DetailsDialogComponent } from './details-dialog/details-dialog.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { MyEventsPageComponent } from './my-events-page/my-events-page.component';
import { EventAdminPageComponent } from './event-admin-page/event-admin-page.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LogInPageComponent } from './log-in-page/log-in-page.component';
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';
import { ReportsPageComponent } from './reports-page/reports-page.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatRadioModule} from "@angular/material/radio";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {CreateEventPageComponent} from "./create-event-page/create-event-page.component";

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    EventCardComponent,
    FindAnEventComponent,
    DetailsDialogComponent,
    DashboardPageComponent,
    MyEventsPageComponent,
    EventAdminPageComponent,
    NavBarComponent,
    LogInPageComponent,
    SignUpPageComponent,
    ReportsPageComponent
    CreateEventPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatMenuModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,

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
