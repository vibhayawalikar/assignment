import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Flights } from '../types/flights';
import { ProcessFlightDataService } from '../services/process-flight-data.service';

@Component({
  selector: 'app-flight-results',
  templateUrl: './flight-results.component.html',
  styleUrls: ['./flight-results.component.scss']
})
export class FlightResultsComponent implements OnInit {
  flights: Flights[];
  formData: any;

  constructor(private readonly dataService: DataService, private readonly processFlightDataService: ProcessFlightDataService) { }

  ngOnInit(): void {
    const formData = sessionStorage.getItem('form') as any;
    this.formData = JSON.parse(formData);

    this.fetchFlightData();
  }

  fetchFlightData(){
    this.dataService.fetchFlightData().subscribe((data: Flights[]) =>{
    const filters = JSON.parse(sessionStorage.getItem('filters') as any);
    let filteredData = data;

    if(filters){
      const classes = [];
      if(filters.economy){
        classes.push('basic');
      }
      if(filters.businessClass){
        classes.push('business');
      }

      filteredData = this.processFlightDataService.filterDataByFareTypes(data, classes, filters.minimumRate, filters.maximumRate);
    }
      this.sortData(filteredData);
    })
  }

  getTimeDiff(depatureTime : number, returnTime: number){
    const hour = Math.floor(((returnTime - depatureTime)% (24* 60 * 60 * 1000))/(60*60*1000))
      const minute = Math.floor(((returnTime - depatureTime)% (60 * 60 * 1000))/(60*1000))

      return `${hour}h ${minute}m`;
  }

  sortData(flightData: Flights[]){
    const sortTechnique = this.processFlightDataService.getSortTechnique();

    switch(sortTechnique){
      case 'lowest':{
        this.flights = this.processFlightDataService.sortPriceAsc(flightData);
        break;
      }
      case 'highest':{
        this.flights = this.processFlightDataService.sortPriceDsc(flightData);
        break;
      }
      case 'shortest':{
        this.flights = this.processFlightDataService.sortShortestDuration(flightData);
        break;
      }
      case 'longest':{
        this.flights = this.processFlightDataService.sortLongestDuration(flightData);
        break;
      }
      case 'departure':{
        this.flights = this.processFlightDataService.sortDepartureAsc(flightData);
        break;
      }
      case 'arrival':{
        this.flights = this.processFlightDataService.sortArrivalAsc(flightData);
        break;
      }
      case 'ascAirlines':{
        this.flights = this.processFlightDataService.sortAirlinesAsc(flightData);
        break;
      }
      case 'dscAirlines':{
        this.flights = this.processFlightDataService.sortAirlinesDsc(flightData);
        break;
      }
    }
  }

}
