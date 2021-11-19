import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { EventsService } from '../events.service';

@Component({
  selector: 'app-create-event-page',
  templateUrl: './create-event-page.component.html',
  styleUrls: ['./create-event-page.component.css']
})
export class CreateEventPageComponent implements OnInit {

  /** The form object for fields to be edited */
  form = new FormGroup({
    event_name: new FormControl('', [Validators.minLength(2), Validators.required]),
    start_date: new FormControl(new Date(), Validators.required),
    end_date: new FormControl(new Date(), Validators.required),
    start_time: new FormControl(new Date()),
    end_time: new FormControl(new Date()),
    num_of_volunteers: new FormControl(10, Validators.required),
    waitlist_num: new FormControl(0),
    address: new FormControl('', [Validators.minLength(2), Validators.required]),
    event_organizer: new FormControl(1),
    description: new FormControl(''),
    image: new FormControl(null)
  });

  // A String representing if this is creating an event.
  action: string = 'Create';

  // Used for a preview image.
  imagePreview: string = '';

  constructor(public eventService: EventsService, private _snackBar: MatSnackBar) { 
    
   }

  // /**
  //  * Creates the form as new again.
  //  */
  // configureNewForm(): void {
  //   this.form = new FormGroup({
  //     event_name: new FormControl('', [Validators.minLength(2), Validators.required]),
  //     start_date: new FormControl(new Date(), Validators.required),
  //     end_date: new FormControl(new Date(), Validators.required),
  //     start_time: new FormControl(new Date()),
  //     end_time: new FormControl(new Date()),
  //     num_of_volunteers: new FormControl(10, Validators.required),
  //     waitlist_num: new FormControl(0),
  //     address: new FormControl('', [Validators.minLength(2), Validators.required]),
  //     event_organizer: new FormControl(1),
  //     description: new FormControl(''),
  //     image: new FormControl('')
  //   });
  // }

  ngOnInit(): void {
  }


  // Image Preview
  // ADAPTED FROM https://medium.com/weekly-webtips/handling-file-uploads-in-angular-reactive-approach-7f90453f57cb
  onSelect(event: Event) {
    let eT: HTMLInputElement = (event.target as HTMLInputElement);
    if (eT == null) {
      throw new Error('Error with event');
    }
    if (eT.files == null || eT.files.length == 0) {
      throw new Error("Error with files event.");
      
    }

    const file = eT.files[0];
    this.form.patchValue({image: file});
    this.form.get('image')?.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = (reader.result != null) ? reader.result.toString() : '';
    };
    reader.readAsDataURL(file);
    }

  // When submitting
  onSubmit() {
    // Combine the date and time for start date/time and end date/time.
    let startDateTime = this.combineTwoDates(this.form.get('start_date')?.value, this.form.get('start_time')?.value);
    let endDateTime = this.combineTwoDates(this.form.get('end_date')?.value, this.form.get('end_time')?.value);
    console.log(startDateTime);

    // First, bundle the form
    let formData = {
      event_name: this.form.get('event_name')?.value,
      event_location: this.form.get('address')?.value,
      event_start: (startDateTime.getMilliseconds()/1000),
      event_end: (endDateTime.getMilliseconds()/1000),
      event_organizer: this.form.get('event_organizer')?.value,
      event_max_volunteers: this.form.get('num_of_volunteers')?.value,
      event_max_waitlist: this.form.get('waitlist_num')?.value,
      event_description: this.form.get('description')?.value,
      // event_image: this.form.get('image')?.value
      event_image: this.imagePreview
    }

    // Second, send the form and the image to a service to send to the server
    this.eventService.createEvent(formData).pipe(catchError(err => {
      return of([err]);
    })).subscribe(item => {
      // Third, Wait for a response.
      console.log(item);

      // Fourth, display a 'snackbar'
      this.openSnackBar(item.event_name);

      // Fifth, clear the form on the page.
      this.onClear();
    });
  }

  // Clears the form
  onClear() {
    this.form.reset({
      event_name: '',
      start_date: new Date(),
      end_date: new Date(),
      start_time: '00:00:00',
      end_time: '00:00:00',
      num_of_volunteers: 10,
      waitlist_num: 0,
      address: '',
      event_organizer: 1,
      description: '',
      image: null
    });
    this.imagePreview = '';
  }

  /**
   * Combines the two dates and returns another date.
   * @param dateInfo The Date with date info
   * @param timeInfo The Date with time info
   */
  combineTwoDates(dateInfo: Date, timeInfo: any): Date {
    let year: number = dateInfo.getFullYear();
    let day: number = dateInfo.getDate();
    let month: number = dateInfo.getMonth();
    console.log(year);

    const timeKeeper = timeInfo.split(':');

    let hour: number = timeKeeper[0];
    let minute: number = timeKeeper[1];
    let combinedDate: Date = new Date(year, month, day, hour, minute);
    console.log(combinedDate);
    return combinedDate;
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, undefined, {duration: 3000});
  }

}
