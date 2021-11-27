import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable, of } from "rxjs";
import { catchError, finalize } from "rxjs/operators";
import { EventSignupsService } from "../event-signups.service";
import { EventsService } from "../events.service";
import { SignupService } from "../signup.service";


export interface EventItem {
    event_id: number;
    event_name: string;
    event_location: string;
    event_start: Date;
    event_end: Date;
    event_organizer: string
    event_organizer_email: string;
    event_max_volunteers: number;
    event_max_waitlist: number;
    event_description: string;
    event_credit: number;
    event_image: string;
}

/**
 * This handles event data.
 * Based on code from https://blog.angular-university.io/angular-material-data-table/
 */
export class MyEventsDataSource extends DataSource<EventItem> {

    events2 = [
        {
            event_id: 1,
            event_name: "Test Event",
            event_location: "1600 Penn",
            event_start: new Date(),
            event_end: new Date(),
            event_organizer: "Cool Project",
            event_organizer_email: "cool@ryans.team",
            event_max_volunteers: 10,
            event_max_waitlist: 5,
            event_description: "Super cool event!",
            event_credit: 2,
            event_image: "https://media.istockphoto.com/photos/bigeyed-naughty-obese-cat-behind-the-desk-with-red-hat-grey-color-picture-id1199279669?b=1&k=20&m=1199279669&s=170667a&w=0&h=munUsqGIlDAmKK0ouS12nHCuzDdoDfvNalw_hHvh6Ls="
        },
        {
            event_id: 2,
            event_name: "Test Event 2",
            event_location: "Campus",
            event_start: new Date(),
            event_end: new Date(),
            event_organizer: "Cool Project",
            event_organizer_email: "cool@ryans.team",
            event_max_volunteers: 10,
            event_max_waitlist: 5,
            event_description: "Super cool event!",
            event_credit: 2,
            event_image: "https://media.istockphoto.com/photos/bigeyed-naughty-obese-cat-behind-the-desk-with-red-hat-grey-color-picture-id1199279669?b=1&k=20&m=1199279669&s=170667a&w=0&h=munUsqGIlDAmKK0ouS12nHCuzDdoDfvNalw_hHvh6Ls="
        }
    ];

    private eventSubject = new BehaviorSubject<EventItem[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    constructor(private signupService: SignupService, private eventsService: EventsService, private eventSignupService: EventSignupsService) {
        super();

    }

    connect(collectionViewer: CollectionViewer): Observable<EventItem[]> {
        return this.eventSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.eventSubject.complete();
        this.loadingSubject.complete();
    }

    // This works for getting just current or all events. Doesn't work for just past events.
    /**
     * Gets events
     * @param userId The user Id of the user to find events.
     */
    loadEvents(userId: number) {
        this.loadingSubject.next(true);

        this.eventSignupService.getEventsForUser(userId).pipe(
            catchError(() => of([]))
        ).subscribe(events => {
            let eventsConvertedTest = new Array<EventItem>();
            console.log('Event Signup Service Test');
            events.forEach((element: any) => {
                console.log(element);
                eventsConvertedTest.push({
                    event_id: element.event[0].event_id,
                    event_name: element.event[0].event_name,
                    event_location: element.event[0].event_location,
                    event_start: new Date(element.event[0].event_start),
                    event_end: new Date(element.event[0].event_end),
                    event_organizer: element.event[0].event_organizer,
                    event_organizer_email: element.event[0].event_organizer_email,
                    event_max_volunteers: element.event[0].event_max_volunteers,
                    event_max_waitlist: element.event[0].event_max_waitlist,
                    event_description: element.event[0].event_description,
                    event_credit: element.event[0].event_credit,
                    event_image: element.event[0].event_image
                });
            });
            this.eventSubject.next(eventsConvertedTest);
        });
        

        // this.signupService.getEventSignupsForUser(userId).pipe(
        //     catchError(() => of([])),
        //     finalize(() => this.loadingSubject.next(false)),
        // )
        // .subscribe(events => {
        //     let eventsConverted = new Array<EventItem>();
        //     // This has each of the events and signup statuses.
        //     events.forEach((item: any) => {
        //         // I will log the status info.
        //         console.log("Item: ", item);

        //         // I need to get information on the event.
        //         this.eventsService.getEvent(item.event_id).pipe(
        //             catchError(() => of([]))
        //         )
        //         .subscribe(e => {
        //             eventsConverted.push({
        //                 event_id: e.event_id,
        //                 event_name: e.event_name,
        //                 event_location: e.event_location,
        //                 event_start: new Date(e.event_start),
        //                 event_end: new Date(e.event_end),
        //                 event_organizer: e.event_organizer,
        //                 event_organizer_email: e.event_organizer_email,
        //                 event_max_volunteers: e.event_max_volunteers,
        //                 event_max_waitlist: e.event_max_waitlist,
        //                 event_description: e.event_description,
        //                 event_credit: e.event_credit,
        //                 event_image: e.event_image
        //             });
        //         });
        //     });
        //     this.eventSubject.next(eventsConverted);
        // });
    }

}