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
        
        this.eventsService.getAllEvents(true, skipToken, pageSize, filter).pipe(
            catchError(() => of([])),
            finalize(() => this.loadingSubject.next(false))
        )
        .subscribe(events => this.eventSubject.next(events));
    }

}