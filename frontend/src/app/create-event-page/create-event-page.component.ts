import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

  constructor() { 
    
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
    // First, bundle the form
    

    // Second, send the form and the image to a service to send to the server

    // Third, wait for a response

    // Fourth, display a "snackbar"

    // Fifth, clear the form on the page

  }

  // Clears the form
  onClear() {
    this.form.reset({
      event_name: '',
      start_date: new Date(),
      end_date: new Date(),
      start_time: new Date(),
      end_time: new Date(),
      num_of_volunteers: 10,
      waitlist_num: 0,
      address: '',
      event_organizer: 1,
      description: '',
      image: null
    });
    this.imagePreview = '';
  }

}
