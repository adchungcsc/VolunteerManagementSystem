import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UsersService } from '../users.service';
import { MyEventsDataSource } from '../my-events-page/my-events-datasource';
import { AttendanceService } from '../attendance.service';
import { EventSignupsService } from '../event-signups.service';
import { EventItem, EventsService } from '../events.service';
import { SignupService } from '../signup.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  welcomeMessage: string = "Hello."
  dataSource!: MyEventsDataSource;
  userId:number = -1;
  userHoursTotal:number = 0;
  dataSourceInfo!: Observable<EventItem[]>;
  viewChange: any;

  constructor(private usersService: UsersService,
    private signupsService: SignupService,
    private eventsService: EventsService,
    private eventSignupService: EventSignupsService,
    private attendanceService: AttendanceService) {
      usersService.getCurrentUser().subscribe(u => {
        this.userId = u[0].user_id;
      });
    }

  ngOnInit(): void {

    this.dataSource = new MyEventsDataSource(this.signupsService, this.eventsService, this.eventSignupService);

    this.dataSourceInfo = this.dataSource.connect(this);
    let self:any = this;
    this.usersService.getCurrentUser().subscribe(u => {
      console.log(u);
      if (u[0].name.includes(" ")) {
        this.welcomeMessage = "Hello " + u[0].name.split(" ")[0] + ".";
      } else {
        this.welcomeMessage = "Hello " + u[0].name + ".";
      }
      this.userId = u[0].user_id;
      this.dataSource.loadEvents(this.userId);

      this.attendanceService.getAllAttendanceForUser(this.userId).subscribe(a => {
        a.forEach(function (attendance: any) {
          self.userHoursTotal += attendance.hours;
        });
      });
    });
  }

}
