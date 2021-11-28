import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
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
  displayedColumns = ['user_id', 'is_waitlisted', 'waitlist_timestamp'];
  // displayedColumns = ['user_name', 'user_email', 'is_waitlisted', 'waitlist_timestamp'];


  // The datasource
  dataSource = new MatTableDataSource<SignupItem>();

  // Name of the Event.
  eventName: string = "Event Name";

  constructor(
    private usersService: UsersService,
    private eventService: EventsService,
    private signupService: SignupService,
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

           // At this point, we are not still in our request.
           // TODO FIX THIS
           this.signupService.getSignupsForEvent(this.eventId).subscribe((signups: any) => {
            //  var loop = new Promise((resolve, reject) => {
               signups.forEach((element: SignupItem) => {
                 this.usersService.getUserObjectFromId(element.user_id).subscribe(i => {
                   let u: UserItem = {
                     user_id: element.user_id,
                     user_name: i.name,
                     user_email: i.email
                   };
                   this.userMap.set(element.user_id, u);
                //  }).add(resolve('complete'));
                  });
               });
            //  });
             
             console.log(this.userMap);
             console.log(this.userMap.values());
             // TODO THIS RUNS TOO EARLY!!!!!!
            //  loop.then(this.dataSource.data = signups);
             this.dataSource.data = signups
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
    this.openSnackBar(`Clicked on ${row.user_id}`);
  }

}
