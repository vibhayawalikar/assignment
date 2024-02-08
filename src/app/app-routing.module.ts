import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarsComponent } from './cars/cars.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FlightFliterComponent } from './flight-fliter/flight-fliter.component';
import { FlightResultsComponent } from './flight-results/flight-results.component';
import { FlightSortComponent } from './flight-sort/flight-sort.component';
import { FlightsComponent } from './flights/flights.component';
import { HotelsComponent } from './hotels/hotels.component';

const routes: Routes = [{
  path: '', component: DashboardComponent,
  children: [
    { path: 'flights', component: FlightsComponent },
    { path: 'cars', component: CarsComponent},
    { path: 'hotels', component: HotelsComponent}
  ]
},
{path: 'flight-results', component: FlightResultsComponent},
{path: 'flight-sort', component: FlightSortComponent},
{path: 'flight-filter', component: FlightFliterComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
