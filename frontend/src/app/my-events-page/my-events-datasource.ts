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
            events.forEach((element: any) => {
                eventsConvertedTest.push({
                    event_id: element.event[0].event_id,
                    event_name: element.event[0].event_name,
                    event_location: element.event[0].event_location,
                    event_start: new Date(element.event[0].event_start),
                    event_end: new Date(element.event[0].event_end),
                    event_organizer: element.event[0].event_organizer,
                    event_max_volunteers: element.event[0].event_max_volunteers,
                    event_max_waitlist: element.event[0].event_max_waitlist,
                    event_description: element.event[0].event_description,
                    event_credit: element.event[0].event_credit,
                    event_image: element.event[0].event_image
                });
            });
            this.eventSubject.next(eventsConvertedTest);
        });
        
    }

}