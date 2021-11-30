import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AttendanceItem, AttendanceService } from '../attendance.service';
import { DeleteConfirmDialogComponent } from '../delete-confirm-dialog/delete-confirm-dialog.component';
import { EventsService } from '../events.service';
import { SignupItem, SignupService } from '../signup.service';
import { UsersService } from '../users.service';

/**
 * The UserItem
 */
interface UserItem {
  user_id: number;
  user_name: string;
  user_email: string;
}

@Component({
  selector: 'app-manage-event',
  templateUrl: './manage-event.component.html',
  styleUrls: ['./manage-event.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

/**
 * The class for Event Management
 */
export class ManageEventComponent implements OnInit {

  // The users
  userMap: Map<Number, UserItem> = new Map<Number, UserItem>();

  // ID for event - URL param.
  eventId: number = 0;

  // What columns to show.
  displayedColumns = ['user_id', 'user_name', 'user_email', 'is_waitlisted', 'waitlist_timestamp', 'actions'];


  // The datasource
  dataSource = new MatTableDataSource<SignupItem>();

  // Name of the Event.
  eventName: string = "Event Name";

  // Used to determine if the spinner should be displayed.
  loading: boolean = false;

  // Properties used for defining what is expanded and what is not.
  expandedElement = null;
  expandedElementFound: boolean = false;
  expandedElementHours: number = 0;
  expandedElementComment: string = '';
  expandedElementRating: number = 0;
  expandedElementStar: string = '';

  constructor(
    private usersService: UsersService,
    private eventService: EventsService,
    private signupService: SignupService,
    private attendanceService: AttendanceService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private Activatedroute: ActivatedRoute,
    private router: Router) { }


  // In the future, move to a map, but this okay for now - ideally don't nest subscribes.
  ngOnInit(): void {
    this.Activatedroute.queryParams
        .subscribe(params => { 
            this.eventId = +params['eventId']||0;
           if (this.eventId === null || this.eventId === 0) {
             // If this, quick message then redirect.
             try {
               throw new Error("An Event must be selected to access this page.");
             } catch (error: any) {
               this.openSnackBar(error.message);
               this.router.navigate(['find-event']);
             }
           }

           this.loading = true;

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
               this.dataSource.data = signups;
               this.loading = false;
             });
           });
        });
  }

  /**
   * Opens a snackbar with a message specified.
   * @param message The message to display
   */
  openSnackBar(message: string) {
    this._snackBar.open(message, undefined, {duration: 3000});
  }

  clickedRow(row: any) {
    // Ideas for this came from Senior Design code.
    // This is collapsing if it is the same row, or switching if a different row.
    this.expandedElement = this.expandedElement === row ? null : row;
    // Resetting the other fields.
    this.expandedElementFound = false;
    this.expandedElementHours = 0;
    this.expandedElementComment = '';
    this.expandedElementRating = 0;
    this.expandedElementStar = '';

    // Basically, if we are expanding the row (not collapsing it).
    if (this.expandedElement === row) {
      // Set it to start loading
      this.loading = true;

      // Get all attendance for the event.
      this.attendanceService.getAllAttendanceForEvent(this.eventId).pipe(catchError(err => {
        this.openSnackBar(`Error ${err}`);
        return of([err]);
      })).subscribe(result => {
        let attendMatch: (AttendanceItem | null) = null;
        // PULL THE CORRECT ONE IF PRESENT AND PASS IT ONWARDS.
        // Find the match.
        result.forEach((element: any) => {
          if (element.attendee_id === row.user_id) {
            // Assign it if it matches the User ID in the row.
            attendMatch = element;
          }
        });
        
        this.loading = false;

        // We have a match (or there is no match).
        // Note - the casting is because we need to force TypeScript to acknowledge it can be non-null.
        if (attendMatch! !== null) {
          this.expandedElementFound = true;
          this.expandedElementHours = (attendMatch as AttendanceItem).hours;
          this.expandedElementComment = (attendMatch as AttendanceItem).comment;
          this.expandedElementRating = (attendMatch as AttendanceItem).rating;
          for (let i = 0; i < this.expandedElementRating; i++) {
            this.expandedElementStar += '⭐';
          }
        }
      });
    }
    
  }

  // Deletes a signup.
  deleteSignup(signup: any) {
    // The signup.user_id is the row where delete was selected.
    // First, open the dialog.
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {data: {eventName: this.eventName, currentUser: this.userMap.get(signup.user_id)?.user_name}});

    dialogRef.afterClosed().pipe(catchError(err => {
      this.openSnackBar(`Error: ${err}`);
      return of([err]);
    })).subscribe(result => {
      if (result) {
        // If yes, sends the request.
        this.signupService.deleteSignup(signup.event_signup_id).pipe(catchError(err => {
          this.openSnackBar(`Error: ${err}`);
          return of([err]);
        })).subscribe(res => {
          // I need to check if the signup deletion was a success
          this.openSnackBar("Signup Deleted.");
          // Reinit the page to get the new data.
          this.ngOnInit();
        });

      } else {
        this.openSnackBar("Deletion cancelled.");
      }
    });
  }

}
