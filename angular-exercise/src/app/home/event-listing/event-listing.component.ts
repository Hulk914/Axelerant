import { EventService } from './../event.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { timer } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-event-listing',
  templateUrl: './event-listing.component.html',
  styleUrls: ['./event-listing.component.css']
})
export class EventListingComponent implements OnInit {

  data = [];
  masterData = [];
  isDataLoaded = false;
  searchVal = '';
  alertName = '';
  displayAlert = false;

  constructor(private http: HttpClient, private router: Router, private eventService: EventService) { }

  ngOnInit() {
    this.http.get('../../../assets/eventlist.json').subscribe((eventList) => {
      this.data = eventList['data'];
      this.masterData = this.data.slice();
      timer(2000).subscribe(() => {
        this.isDataLoaded = true;
      });
      console.log(this.data);
    });
  }

  searchName() {
    console.log(this.searchVal);
    if (!this.searchVal) {
      this.data = this.masterData.slice();
    } else {
      this.data = this.data.filter((event) => {
        return event.name.toUpperCase().indexOf(this.searchVal.toUpperCase()) !== -1;
      });
    }
  }

  navigate(selectedEvent) {
    this.eventService.selectedEvent = selectedEvent;
    this.router.navigate(['/home/event-booking']);
  }

  showAlert(event) {
    this.alertName = event.name;
    this.displayAlert = true;
    timer(2000).subscribe(() => {
      this.displayAlert = false;
    });
  }
}
