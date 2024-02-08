import { Injectable } from '@angular/core';
import { Flights } from '../types/flights';

@Injectable({
  providedIn: 'root'
})
export class ProcessFlightDataService {
  sortTechnique:string = 'lowest';

  constructor() { }

  getSortTechnique(){
    return this.sortTechnique;
  }

  setSortTechnique(sortTechnique: string){
    this.sortTechnique = sortTechnique;
  }

  sortPriceAsc(flights: Flights[]){
    return flights.sort((a, b) => a.fare.basic - b.fare.basic);
  }

  sortPriceDsc(flights: Flights[]){
    return flights.sort((a, b) => b.fare.basic - a.fare.basic);
  }

  sortShortestDuration(flights: Flights[]){
    return flights.sort((a, b) => (a.returnTime - a.depatureTime) - (b.returnTime - b.depatureTime));
  }

  sortLongestDuration(flights: Flights[]){
    return flights.sort((a, b) => (b.returnTime - b.depatureTime) - (a.returnTime - a.depatureTime));
  }

  sortDepartureAsc(flights: Flights[]){
    return flights.sort((a, b) => a.depatureTime - b.depatureTime);
  }

  sortArrivalAsc(flights: Flights[]){
    return flights.sort((a, b) => a.returnTime - b.returnTime);
  }

  sortAirlinesAsc(flights: Flights[]){
    return flights.sort((a, b) => a.airline.localeCompare(b.airline));
  }

  sortAirlinesDsc(flights: Flights[]){
    return flights.sort((a, b) => b.airline.localeCompare(a.airline));
  }

  filterDataByFareTypes(data: Flights[], fareTypes: string[], minAmount: number = 0, maxAmount: number = 1000) {
    fareTypes = fareTypes || ['basic', 'busniess', 'main'];
    minAmount = minAmount || 0;
    maxAmount = maxAmount || 1000;

    return data.filter(flight => {
      const fares = Object.values(flight.fare);
      return fareTypes.every(fareType => {
        const flightFares = flight.fare as any
        const fare = flightFares[fareType];
        return fare >= minAmount && fare <= maxAmount;
      });
    });
  }
}
