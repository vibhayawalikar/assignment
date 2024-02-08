import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatIconModule} from '@angular/material/icon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FlightsComponent } from './flights/flights.component';
import { CarsComponent } from './cars/cars.component';
import { HotelsComponent } from './hotels/hotels.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlightResultsComponent } from './flight-results/flight-results.component';
import { FlightSortComponent } from './flight-sort/flight-sort.component';
import { HttpClientModule } from '@angular/common/http';
import { FlightFliterComponent } from './flight-fliter/flight-fliter.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    FlightsComponent,
    CarsComponent,
    HotelsComponent,
    FlightResultsComponent,
    FlightSortComponent,
    FlightFliterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
