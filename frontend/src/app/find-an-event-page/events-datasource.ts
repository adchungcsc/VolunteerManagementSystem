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

    private eventSubject = new BehaviorSubject<EventItem[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();
    // Length for paginator.
    public lengthOfEvents = 100;

    constructor(private eventsService: EventsService) {
        super();

    }

    // Connect to the datasource.
    connect(collectionViewer: CollectionViewer): Observable<EventItem[]> {
        return this.eventSubject.asObservable();
    }

    // Disconnect.
    disconnect(collectionViewer: CollectionViewer): void {
        this.eventSubject.complete();
        this.loadingSubject.complete();
    }

    // This works for getting just current or all events. Doesn't work for just past events.
    /**
     * 
     * @param showPastEvents Should old events be displayed? By default this is true.
     * @param filter A string for server-side filtering of events.
     * @param skipToken Where do you want to start? (from 0? from item 10?)
     * @param pageSize How many elements do you want to be returned?
     */
    loadEvents(showPastEvents: boolean = true, filter: string, skipToken: number, pageSize: number) {
        this.loadingSubject.next(true);
        
        this.eventsService.getAllEvents(showPastEvents, skipToken, pageSize, filter).pipe(
            catchError(() => of([])),
            finalize(() => this.loadingSubject.next(false))
        )
        .subscribe(eventsRet => {
            this.lengthOfEvents = eventsRet.count;
            let eventsConverted = new Array<EventItem>();
            eventsRet.events.forEach((item: any) => {
                eventsConverted.push({
                    event_id: item.event_id,
                    event_name: item.event_name,
                    event_location: item.event_location,
                    event_start: new Date(item.event_start),
                    event_end: new Date(item.event_end),
                    event_organizer: item.event_organizer,
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