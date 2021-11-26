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
export class FindAnEventComponent implements OnInit {

  dataSource!: EventsDataSource;

  dataSourceInfo!: Observable<EventItem[]>;

  viewChange: any;

  currentPageSize: number = 10;

  currentSkipToken: number = 0;

  currentPageIndex: number = 1;

  // The total number of events.
  numberOfEvents: number = 100;

  // This is for the toggle on if old events should be displayed.
  displayOldEvents: boolean = false;

  @ViewChild('input') input!: ElementRef;

  constructor(private eventsService: EventsService) { }

  ngOnInit(): void {
    this.dataSource = new EventsDataSource(this.eventsService);

    // Sets page size to default
    this.currentPageSize = 10;
    this.currentSkipToken = 0;
    this.currentPageIndex = 1;

    // CollectionViewer a = new CollectionViewer();

    this.dataSourceInfo = this.dataSource.connect(this);
    // TODO increase page size.
    this.dataSource.loadEvents(this.displayOldEvents, '', this.currentSkipToken, this.currentPageSize);

    console.log('view change');
    console.log(this.viewChange);
    console.log('datasourceinfo');
    console.log(this.dataSourceInfo);
  }

  ngAfterViewInit(): void {
    fromEvent(this.input.nativeElement,'keyup').pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => {
        this.currentSkipToken = 0;
        this.currentPageIndex = 1;
        this.dataSource.loadEvents(this.displayOldEvents, this.input.nativeElement.value, this.currentSkipToken, this.currentPageSize);
      })
    ).subscribe();
  }

  /**
   * Display or hide previous events.
   * @param event The event
   */
  displayPreviousEvents() {
    this.currentPageIndex = 1;
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
    

    // Adjust page size and skip token due to changes made.
    this.currentPageSize = event.pageSize;
    this.currentSkipToken = (event.pageIndex - 1) * event.pageSize;


    this.dataSource.loadEvents(this.displayOldEvents, this.input.nativeElement.value, this.currentSkipToken, this.currentPageSize);
  }

}
