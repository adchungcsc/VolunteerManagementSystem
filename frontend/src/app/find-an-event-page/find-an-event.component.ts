import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { EventsService } from '../events.service';
import { EventItem, EventsDataSource } from './events-datasource';
import { CollectionViewer } from "@angular/cdk/collections";
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

@Component({
  selector: 'app-find-an-event',
  templateUrl: './find-an-event.component.html',
  styleUrls: ['./find-an-event.component.css']
})
export class FindAnEventComponent implements OnInit {

  dataSource!: EventsDataSource;

  dataSourceInfo!: Observable<EventItem[]>;

  viewChange: any;

  // This is for the toggle on if old events should be displayed.
  displayOldEvents: boolean = false;

  @ViewChild('input') input!: ElementRef;

  constructor(private eventsService: EventsService) { }

  ngOnInit(): void {
    this.dataSource = new EventsDataSource(this.eventsService);

    // CollectionViewer a = new CollectionViewer();

    this.dataSourceInfo = this.dataSource.connect(this);
    // TODO increase page size.
    this.dataSource.loadEvents(this.displayOldEvents, '', 0, 10);

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
        this.dataSource.loadEvents(this.displayOldEvents, this.input.nativeElement.value, 0, 10);
      })
    ).subscribe();
  }

  /**
   * Display or hide previous events.
   * @param event The event
   */
  displayPreviousEvents() {
    this.dataSource.loadEvents(this.displayOldEvents, this.input.nativeElement.value, 0, 10);
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

}
