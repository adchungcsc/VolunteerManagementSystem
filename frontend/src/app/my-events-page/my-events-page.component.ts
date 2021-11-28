import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EventsService } from '../events.service';
import { EventItem } from '../find-an-event-page/events-datasource';
import { MyEventsDataSource } from './my-events-datasource';
import { SignupService } from '../signup.service';
import { EventSignupsService } from '../event-signups.service';
import { UsersService } from '../users.service';
import { AttendanceService } from '../attendance.service';

@Component({
  selector: 'app-my-events-page',
  templateUrl: './my-events-page.component.html',
  styleUrls: ['./my-events-page.component.css']
})
export class MyEventsPageComponent implements OnInit {

  dataSource!: MyEventsDataSource;

  now = new Date();
  item2 = new Date();
  aWeekAgo = new Date(this.item2.setDate(this.now.getDate() - 7));
  dataSourceInfo!: Observable<EventItem[]>;
  testInformation: EventItem[] = new Array<EventItem>();
  viewChange: any;
  welcomeMessage:string = "Hello.";
  userHoursTotal:number = 0;
  userEventsTotal:number = 0;
  userId:number = -1;

  constructor(
    private signupsService: SignupService,
    private eventsService: EventsService,
    private eventSignupService: EventSignupsService,
    private usersService: UsersService,
    private attendanceService: AttendanceService
    ) { 
      usersService.getCurrentUser().subscribe(u => {
        this.userId = u[0].user_id;
      });
    }

  ngOnInit(): void {

    this.dataSource = new MyEventsDataSource(this.signupsService, this.eventsService, this.eventSignupService);

    // CollectionViewer a = new CollectionViewer();

    this.dataSourceInfo = this.dataSource.connect(this);
    let self:any = this;
    this.usersService.getCurrentUser().subscribe(u => {
      console.log(u);
      this.welcomeMessage = "Hello " + u[0].name.split(" ")[0] + ".";
      this.userId = u[0].user_id;
      this.dataSource.loadEvents(this.userId);

      console.log("DataSourceInfo from MyEvents");
      console.log(this.dataSourceInfo);

      this.attendanceService.getAllAttendanceForUser(this.userId).subscribe(a => {
        a.forEach(function (attendance: any) {
          self.userEventsTotal++;
          self.userHoursTotal += attendance.hours;
        });
      });
    });
    
  }

}