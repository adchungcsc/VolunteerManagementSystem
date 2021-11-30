import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { EventsService } from './events.service';
import { SignupService } from './signup.service';

@Injectable({
  providedIn: 'root'
})
export class EventSignupsService {

  constructor(private eventsService: EventsService, private signupService: SignupService) { }

  getEventsForUser(userId: number): Observable<any> {
    return this.signupService.getEventSignupsForUser(userId).pipe(
      switchMap((signup: any[]) => {
        if (signup.length > 0) {
          return forkJoin(
            signup.map((oneSign: any) => {
              return this.eventsService.getEvent(oneSign.event_id).pipe(
                map((eventItem: any) => {
                  oneSign.event = eventItem;
                  return oneSign;
                })
              )
            })
          );
        }
        return of([]);
      })
    )
  }
}
