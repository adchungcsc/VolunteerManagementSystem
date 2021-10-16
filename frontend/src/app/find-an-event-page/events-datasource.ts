import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable, of } from "rxjs";
import { catchError, finalize } from "rxjs/operators";
import { EventsService } from "../events.service";


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
export class EventsDataSource extends DataSource<EventItem> {

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

    constructor(private eventsService: EventsService) {
        super();

    }

    connect(collectionViewer: CollectionViewer): Observable<EventItem[]> {
        return this.eventSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.eventSubject.complete();
        this.loadingSubject.complete();
    }

    loadEvents(filter: string, skipToken: number, pageSize: number) {
        this.loadingSubject.next(true);

        // TODO REMOVE
        // this.eventSubject.next(this.events2);
        
        // TODO UNCOMMENT
        this.eventsService.getAllEvents(true, skipToken, pageSize, filter).pipe(
            catchError(() => of([])),
            finalize(() => this.loadingSubject.next(false))
        )
        .subscribe(events => {
            let eventsConverted = new Array<EventItem>();
            events.forEach((item: any) => {
                console.log("Item: ", item);
                eventsConverted.push({
                    event_id: item.event_id,
                    event_name: item.event_name,
                    event_location: item.event_location,
                    event_start: new Date(item.event_start),
                    event_end: new Date(item.event_end),
                    event_organizer: item.event_organizer,
                    event_organizer_email: item.event_organizer_email,
                    event_max_volunteers: item.event_max_volunteers,
                    event_max_waitlist: item.event_max_waitlist,
                    event_description: item.event_description,
                    event_credit: item.event_credit,
                    event_image: item.event_image
                });
            });
            this.eventSubject.next(eventsConverted);
        });
    }

}