import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AttendanceItem, AttendanceService } from '../attendance.service';
import { EventsService } from '../events.service';
import { SignupItem, SignupService } from '../signup.service';
import { UsersService } from '../users.service';

interface UserItem {
  user_id: number;
  user_name: string;
  user_email: string;
}

@Component({
  selector: 'app-manage-event',
  templateUrl: './manage-event.component.html',
  styleUrls: ['./manage-event.component.css']
})
export class ManageEventComponent implements OnInit {

  // The users
  userMap: Map<Number, UserItem> = new Map<Number, UserItem>();

  // ID for event - URL param.
  eventId: number = 0;

  // What columns to show.
  // displayedColumns = ['user_id', 'is_waitlisted', 'waitlist_timestamp'];
  displayedColumns = ['user_id', 'user_name', 'user_email', 'is_waitlisted', 'waitlist_timestamp'];


  // The datasource
  dataSource = new MatTableDataSource<SignupItem>();

  // Name of the Event.
  eventName: string = "Event Name";

  constructor(
    private usersService: UsersService,
    private eventService: EventsService,
    private signupService: SignupService,
    private attendanceService: AttendanceService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private Activatedroute: ActivatedRoute,
    private router: Router) { }


  // TODO MIGRATE/MAP - ideally don't nest subscribes.
  ngOnInit(): void {
    this.Activatedroute.queryParams
        .subscribe(params => { 
            this.eventId = +params['eventId']||0;
           console.log('Query params ',this.eventId) 
           if (this.eventId === null || this.eventId === 0) {
             // If this, quick message then redirect.
             try {
               throw new Error("An Event must be selected to access this page.");
             } catch (error: any) {
               this.openSnackBar(error.message);
               this.router.navigate(['find-event']);
             }
           }

           // Get the name of the event.
           this.eventService.getEvent(this.eventId).subscribe(item => {
             this.eventName = item[0].event_name;
           })

           // Get ALL of the users in the system.
           this.usersService.getAllUsers().subscribe((users: any) => {
             // This basically takes each user and makes a UserItem, storing it in the map.
             users.forEach((element: any) => {
               let u: UserItem = {
                 user_id: element.user_id,
                 user_name: element.name,
                 user_email: element.email
               };
               this.userMap.set(element.user_id, u);
             });

             // This gets the actual signups and provides it as the datasource.
             this.signupService.getSignupsForEvent(this.eventId).subscribe((signups: any) => {
               console.log(this.userMap);
               console.log(this.userMap.values());

               this.dataSource.data = signups;
             });
           });
        });
  }


  // openDialog() {
  //   const dialogRef = this.dialog.open(DetailsDialogComponent, {data: this.eventItem});

  //   dialogRef.afterClosed().pipe(catchError(err => {
  //     this.openSnackBar(`Error: ${err}`);
  //     return of([err]);
  //   })).subscribe(result => {
  //     if (result != undefined) {
  //       console.log(`Dialog result: ${result}`);
  //       if (result.event === 'signup') {
  //         this.openSnackBar(`Event Sign-up Status: ${result.status}`);
  //       }
  //     }
  //   });
  // }

  /**
   * Opens a snackbar with a message specified.
   * @param message The message to display
   */
  openSnackBar(message: string) {
    this._snackBar.open(message, undefined, {duration: 3000});
  }

  clickedRow(row: any) {
    this.openSnackBar(`Clicked on ${row.user_id} ${this.userMap.get(row.user_id)?.user_name}`);

    this.attendanceService.getAllAttendanceForEvent(this.eventId).subscribe(result => {
      console.log(result);
      var attendMatch: (AttendanceItem | null) = null;
      // PULL THE CORRECT ONE IF PRESENT AND PASS IT ONWARDS.
      // Find the match.
      result.forEach((element: any) => {
        if (element.attendee_id === row.user_id) {
          attendMatch = element;
        }
      });

      // We have a match (or there is no match).
      console.log(attendMatch);
      if (attendMatch !== null) {
        this.openSnackBar(`Attendance Found: ${attendMatch}`);
      } else {
        this.openSnackBar("No Attendance Records Present");
      }
    });
  }

}
