import { EventService } from './../event.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators, AbstractControl } from '@angular/forms';
import { Location } from '@angular/common';
import { timer } from 'rxjs';

@Component({
  selector: 'app-event-booking',
  templateUrl: './event-booking.component.html',
  styleUrls: ['./event-booking.component.css']
})
export class EventBookingComponent implements OnInit {

  @ViewChild('success') successAlert: ElementRef;
  eventForm: FormGroup;
  arrayItems = [];
  showSuccessAlert: boolean;

  constructor(private eventService: EventService, private fb: FormBuilder, private location: Location) { }

  ngOnInit() {
    this.eventForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      phone: ['', this.ValidatePhoneNumber],
      seats: [1, [Validators.required, Validators.max(this.eventService.selectedEvent['seats'])]],
      extraAttendees: this.fb.array([])
    });

    this.eventForm.controls.seats.valueChanges.subscribe((seatValue) => {
      if (seatValue > 1) {
        this.arrayItems = Array.from(Array(seatValue - 1), (x, index) => index + 1);
        while (0 !== this.extraAttendees.length) {
          this.extraAttendees.removeAt(0);
        }
        this.arrayItems.forEach((val) => {
          const attendeeGroup = this.fb.group({
            attendee: ['', Validators.required]
          });
          this.extraAttendees.push(attendeeGroup);
        });
      } else {
        while (0 !== this.extraAttendees.length) {
          this.extraAttendees.removeAt(0);
        }
        this.arrayItems = [];
      }
    });
  }

  ValidatePhoneNumber(control: AbstractControl) {
    if (isNaN(control.value) || control.value.length !== 10) {
      return { invalidPhone: true };
    }
    return null;
  }

  get extraAttendees() {
    return this.eventForm.get('extraAttendees') as FormArray;
  }

  onSubmit(finalForm) {
    if (finalForm.invalid) {
      return;
    }
    this.showSuccessAlert = true;
    this.successAlert.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // since no post apis present, as per requirement logging data to console
    console.log('Submission Data', finalForm);
    timer(5000).subscribe(() => {
      this.showSuccessAlert = false;
      this.location.back();
    });
  }

  onCancel() {
    this.location.back();
  }
}
