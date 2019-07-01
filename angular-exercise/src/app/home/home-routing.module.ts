import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventListingComponent } from './event-listing/event-listing.component';
import { EventBookingComponent } from './event-booking/event-booking.component';

const routes: Routes = [
  {
    path: 'event-listing',
    component: EventListingComponent
  },
  {
    path: 'event-booking',
    component: EventBookingComponent
  },
  {
    path: '',
    redirectTo: '/page-not-found',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
