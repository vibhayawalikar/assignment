import { TestBed } from '@angular/core/testing';
import { Flights } from '../types/flights';

import { ProcessFlightDataService } from './process-flight-data.service';

describe('ProcessFlightDataService', () => {
  let service: ProcessFlightDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcessFlightDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return sort technique', () =>{
    service.sortTechnique = 'lowest'

    const technique = service.getSortTechnique();

    expect(technique).toBe('lowest');
  });

  it('should set sort technique', () =>{
    service.setSortTechnique('lowest');

    expect(service.sortTechnique).toBe('lowest');
  });

  it('should sort flights in ascending order based on basic fare', () => {
    const unsortedFlights = [
      { airline: 'Indigo', fare: { basic: 125 } },
      { airline: 'Jet Airways', fare: { basic: 110 } },
      { airline: 'British Airways', fare: { basic: 128 } },
    ] as Flights[];

    const sortedFlights = service.sortPriceAsc(unsortedFlights);

    expect(sortedFlights).toEqual([
      { airline: 'Jet Airways', fare: { basic: 110 } },
      { airline: 'Indigo', fare: { basic: 125 } },
      { airline: 'British Airways', fare: { basic: 128 } },
    ] as Flights[]);
  });

  it('should sort flights in descending order based on basic fare', () => {
    const unsortedFlights = [
      { airline: 'Indigo', fare: { basic: 125 } },
      { airline: 'Jet Airways', fare: { basic: 110 } },
      { airline: 'British Airways', fare: { basic: 128 } },
    ] as Flights[];

    const sortedFlights = service.sortPriceDsc(unsortedFlights);

    expect(sortedFlights).toEqual([
      { airline: 'British Airways', fare: { basic: 128 } },
      { airline: 'Indigo', fare: { basic: 125 } },
      { airline: 'Jet Airways', fare: { basic: 110 } },
    ] as Flights[]);
  });

  it('should sort flights in ascending order based on duration', () => {
    const unsortedFlights = [
      { airline: 'Indigo', depatureTime: 1707202404504, returnTime: 1707216382064 },
      { airline: 'Jet Airways', depatureTime: 1707202404504, returnTime: 1707213562064 },
      { airline: 'British Airways', depatureTime: 1707205284504, returnTime: 1707213562064 },
    ] as Flights[];

    const sortedFlights = service.sortShortestDuration(unsortedFlights);

    expect(sortedFlights).toEqual([
      { airline: 'British Airways', depatureTime: 1707205284504, returnTime: 1707213562064 },
      { airline: 'Jet Airways', depatureTime: 1707202404504, returnTime: 1707213562064 },
      { airline: 'Indigo', depatureTime: 1707202404504, returnTime: 1707216382064 },
    ] as Flights[]);
  });

  it('should sort flights in descending order based on duration', () => {
    const unsortedFlights = [
      { airline: 'Indigo', depatureTime: 1707202404504, returnTime: 1707216382064 },
      { airline: 'Jet Airways', depatureTime: 1707202404504, returnTime: 1707213562064 },
      { airline: 'British Airways', depatureTime: 1707205284504, returnTime: 1707213562064 },
    ] as Flights[];

    const sortedFlights = service.sortLongestDuration(unsortedFlights);

    expect(sortedFlights).toEqual([
      { airline: 'Indigo', depatureTime: 1707202404504, returnTime: 1707216382064 },
      { airline: 'Jet Airways', depatureTime: 1707202404504, returnTime: 1707213562064 },
      { airline: 'British Airways', depatureTime: 1707205284504, returnTime: 1707213562064 }
    ] as Flights[]);
  });

  it('should sort flights in ascending order based on departure time', () => {
    const unsortedFlights = [
      { airline: 'Indigo', depatureTime: 1707202404504 },
      { airline: 'Jet Airways', depatureTime: 1707203562064 },
      { airline: 'British Airways', depatureTime: 1707201282064 },
    ] as Flights[];

    const sortedFlights = service.sortDepartureAsc(unsortedFlights);

    // Check that the flights are sorted in ascending order based on departure time
    expect(sortedFlights).toEqual([
      { airline: 'British Airways', depatureTime: 1707201282064 },
      { airline: 'Indigo', depatureTime: 1707202404504 },
      { airline: 'Jet Airways', depatureTime: 1707203562064 },
    ] as Flights[]);
  });

  it('should sort flights in ascending order based on return time', () => {
    const unsortedFlights = [
      { airline: 'Indigo', returnTime: 1707216382064 },
      { airline: 'Jet Airways', returnTime: 1707213562064 },
      { airline: 'British Airways', returnTime: 1707201282064 },
    ] as Flights[];

    const sortedFlights = service.sortArrivalAsc(unsortedFlights);

    expect(sortedFlights).toEqual([
      { airline: 'British Airways', returnTime: 1707201282064 },
      { airline: 'Jet Airways', returnTime: 1707213562064 },
      { airline: 'Indigo', returnTime: 1707216382064 },
    ] as Flights[]);
  });

  it('should sort flights in ascending order based on airline name', () => {
    const unsortedFlights = [
      { airline: 'Indigo', returnTime: 1707216382064 },
      { airline: 'Jet Airways', returnTime: 1707213562064 },
      { airline: 'British Airways', returnTime: 1707201282064 },
    ] as Flights[];

    const sortedFlights = service.sortAirlinesAsc(unsortedFlights);

    expect(sortedFlights).toEqual([
      { airline: 'British Airways', returnTime: 1707201282064 },
      { airline: 'Indigo', returnTime: 1707216382064 },
      { airline: 'Jet Airways', returnTime: 1707213562064 },
    ] as Flights[]);
  });

  it('should sort flights in descending order based on airline name', () => {
    const unsortedFlights = [
      { airline: 'Indigo', returnTime: 1707216382064 },
      { airline: 'Jet Airways', returnTime: 1707213562064 },
      { airline: 'British Airways', returnTime: 1707201282064 },
    ] as Flights[];

    const sortedFlights = service.sortAirlinesDsc(unsortedFlights);

    expect(sortedFlights).toEqual([
      { airline: 'Jet Airways', returnTime: 1707213562064 },
      { airline: 'Indigo', returnTime: 1707216382064 },
      { airline: 'British Airways', returnTime: 1707201282064 },
    ] as Flights[]);
  });

});
