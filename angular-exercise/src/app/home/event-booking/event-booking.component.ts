import { EventService } from './../event.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-event-booking',
  templateUrl: './event-booking.component.html',
  styleUrls: ['./event-booking.component.css']
})
export class EventBookingComponent implements OnInit {

  eventForm: FormGroup;
  arrayItems = [];
  constructor(private eventService: EventService, private fb: FormBuilder) { }

  ngOnInit() {
    this.eventForm = this.fb.group({
      name: ['', Validators.required],
      email: [''],
      phone: [''],
      seats: [1],
      extraAttendees: this.fb.array([])
    });

    this.eventForm.controls.seats.valueChanges.subscribe((seatValue) => {
      if (seatValue > 1) {
        this.arrayItems = Array.from(Array(seatValue - 1), (x, index) => index + 1);
        while (0 !== this.extraAttendees.length) {
          this.extraAttendees.removeAt(0);
        }
        this.arrayItems.forEach((val) => {
          const otherGroup = this.fb.group({
            others: ['']
          });
          this.extraAttendees.push(otherGroup);
        });
      } else {
        while (0 !== this.extraAttendees.length) {
          this.extraAttendees.removeAt(0);
        }
        this.arrayItems = [];
      }
    });

    this.eventForm.valueChanges.subscribe((val) => {
      console.log(val);
    });
  }

  get extraAttendees() {
    return this.eventForm.get('extraAttendees') as FormArray;
  }

}
