import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { EventsService } from '../events.service';
import { EventItem, EventsDataSource } from './events-datasource';
import { CollectionViewer } from "@angular/cdk/collections";
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-find-an-event',
  templateUrl: './find-an-event.component.html',
  styleUrls: ['./find-an-event.component.css']
})

/**
 * This is used for the Find an Event Page component.
 */
export class FindAnEventComponent implements OnInit {

  // The data connection
  dataSource!: EventsDataSource;

  // The data source observable to access the array of Event Items.
  dataSourceInfo!: Observable<EventItem[]>;

  // Required due to the DataSource, but not used manually.
  viewChange: any;

  // The current page size (how many items at a time)
  currentPageSize: number = 10;

  // The current skip token (where do I start looking? How many items into the code?)
  currentSkipToken: number = 0;

  // The current page index (what page am I currently on?)
  currentPageIndex: number = 0;

  // The total number of events.
  numberOfEvents: number = 100;

  // What was the page size? Used to determine if we need to go back to the first page (page 0), if the size changed.
  oldPageSize: number = 10;

  // This is for the toggle on if old events should be displayed.
  displayOldEvents: boolean = false;

  @ViewChild('input') input!: ElementRef;

  /**
   * The constructor for the Find an Event component.
   * @param eventsService The eventsService object for accessing event related APIs.
   */
  constructor(private eventsService: EventsService) { }

  /**
   * Initializes attributes. An Angular "constructor" of sorts.
   */
  ngOnInit(): void {
    this.dataSource = new EventsDataSource(this.eventsService);

    // Sets page size to default, old page size to be the same, and sets the token and index.
    this.currentPageSize = 10;
    this.oldPageSize = 10;
    this.currentSkipToken = 0;
    this.currentPageIndex = 0;

    // CollectionViewer a = new CollectionViewer();

    // Connects to the database and loads events.
    this.dataSourceInfo = this.dataSource.connect(this);
    this.dataSource.loadEvents(this.displayOldEvents, '', this.currentSkipToken, this.currentPageSize);

    // TODO REMOVE LOGS.
    console.log('view change');
    console.log(this.viewChange);
    console.log('datasourceinfo');
    console.log(this.dataSourceInfo);
  }

  /**
   * Used for searches.
   */
  ngAfterViewInit(): void {
    fromEvent(this.input.nativeElement,'keyup').pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => {
        this.currentSkipToken = 0;
        this.currentPageIndex = 0;
        this.dataSource.loadEvents(this.displayOldEvents, this.input.nativeElement.value, this.currentSkipToken, this.currentPageSize);
      })
    ).subscribe();
  }

  /**
   * Display or hide previous events.
   * @param event The event
   */
  displayPreviousEvents() {
    this.currentPageIndex = 0;
    this.currentSkipToken = 0;
    this.dataSource.loadEvents(this.displayOldEvents, this.input.nativeElement.value, this.currentSkipToken, this.currentPageSize);
  }

  /**
   * Filters based on search term.
   * @param event The key up event to start the filter.
   */
  applyFilter(event: Event) {
    // Gets the value from the field.
    const valueOfFilter = (event.target as HTMLInputElement).value;
    // Actually filter it.
    

  }

  /**
   * Changes the displayed data.
   * @param event The page change
   */
  onPageChange(event: PageEvent) {
    console.log('Paginator:');
    console.log(event);
    console.log('Current index ' + this.currentPageIndex);
    console.log('Current page size ' + this.currentPageSize);
    console.log('Current Skip Token ' + this.currentSkipToken);
    console.log('Event page size is ' + event.pageSize + ' and index is ' + event.pageIndex);
    
    if (event.pageSize != this.oldPageSize) {
      // If the page size changed, reset the index to be back to the start.
      this.currentPageIndex = 0;
      // then set the old page size to the current page size.
      this.oldPageSize = event.pageSize;
    }

    // Adjust skip token due to changes made.
    this.currentSkipToken = event.pageIndex * event.pageSize;

    // This loads the new events.
    this.dataSource.loadEvents(this.displayOldEvents, this.input.nativeElement.value, this.currentSkipToken, this.currentPageSize);
  }

}
