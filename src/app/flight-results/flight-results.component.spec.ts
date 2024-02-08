import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ProcessFlightDataService } from '../services/process-flight-data.service';
import { DataService } from '../services/data.service';

import { ProcessFlightDataServiceStub, DataServiceStub } from '../services/service.stub';

import { FlightResultsComponent } from './flight-results.component';
import { Flights } from '../types/flights';
import { of } from 'rxjs';

describe('FlightResultsComponent', () => {
  let component: FlightResultsComponent;
  let fixture: ComponentFixture<FlightResultsComponent>;
  let processFlightDataServiceStub: ProcessFlightDataServiceStub;
  let dataServiceStub: DataServiceStub;

  const flights: Flights[] = [{
    "airline": "Indigo",
    "depatureTime": 1707202404504,
    "returnTime": 1707216382064,
    "fare": {
      "basic": 125,
      "main": 212,
      "business": 400
    }
  }]

  beforeEach(async () => {
    processFlightDataServiceStub = new ProcessFlightDataServiceStub();
    dataServiceStub = new DataServiceStub();

    await TestBed.configureTestingModule({
      declarations: [ FlightResultsComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [
        {provide: ProcessFlightDataService, useValue: processFlightDataServiceStub},
        {provide: DataService, useValue: dataServiceStub}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.formData = {
      class : "economy",
      departDate : "2024-02-07", 
      departure : "Mumbai",
      destination : "Bangalore",
      returnDate: "2024-02-08",
      travelerStr : "1 Adult 0 Children"
    }
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call fetchFlightData on ngonint', () =>{
    const fetchFlightData = spyOn(component, 'fetchFlightData');

    component.ngOnInit();

    expect(fetchFlightData).toHaveBeenCalled();
  });

  it('should return time duration hh:mm formate',()  => {
    const depatureTime = 1707202404504; // Tue Feb 06 2024 12:23:24 GMT+0530 (India Standard Time)
    const returnTime = 1707216382064; //Tue Feb 06 2024 16:16:22 GMT+0530 (India Standard Time)
    const duration ='3h 52m'

    const time = component.getTimeDiff(depatureTime, returnTime);

    expect(time).toBe(duration);
  });

  it('should call sortPriceAsc', () =>{
    const sortPriceAscSpy = spyOn(processFlightDataServiceStub, 'sortPriceAsc');
    const getSortTechnique = spyOn(processFlightDataServiceStub, 'getSortTechnique').and.returnValue('lowest');

    component.sortData(flights);

    expect(getSortTechnique).toHaveBeenCalled();
    expect(sortPriceAscSpy).toHaveBeenCalledOnceWith(flights);
  });

  it('should call sortPriceDsc', () =>{
    const sortPriceDscSpy = spyOn(processFlightDataServiceStub, 'sortPriceDsc');
    const getSortTechnique = spyOn(processFlightDataServiceStub, 'getSortTechnique').and.returnValue('highest');

    component.sortData(flights);

    expect(getSortTechnique).toHaveBeenCalled();
    expect(sortPriceDscSpy).toHaveBeenCalledOnceWith(flights);
  });

  it('should call sortShortestDuration', () =>{
    const sortShortestDurationSpy = spyOn(processFlightDataServiceStub, 'sortShortestDuration');
    const getSortTechnique = spyOn(processFlightDataServiceStub, 'getSortTechnique').and.returnValue('shortest');

    component.sortData(flights);

    expect(getSortTechnique).toHaveBeenCalled();
    expect(sortShortestDurationSpy).toHaveBeenCalledOnceWith(flights);
  });

  it('should call sortLongestDuration', () =>{
    const sortLongestDurationSpy = spyOn(processFlightDataServiceStub, 'sortLongestDuration');
    const getSortTechnique = spyOn(processFlightDataServiceStub, 'getSortTechnique').and.returnValue('longest');

    component.sortData(flights);

    expect(getSortTechnique).toHaveBeenCalled();
    expect(sortLongestDurationSpy).toHaveBeenCalledOnceWith(flights);
  });


  it('should call sortDepartureAsc', () =>{
    const sortDepartureAscSpy = spyOn(processFlightDataServiceStub, 'sortDepartureAsc');
    const getSortTechnique = spyOn(processFlightDataServiceStub, 'getSortTechnique').and.returnValue('departure');

    component.sortData(flights);

    expect(getSortTechnique).toHaveBeenCalled();
    expect(sortDepartureAscSpy).toHaveBeenCalledOnceWith(flights);
  });


  it('should call sortArrivalAsc', () =>{
    const sortArrivalAscSpy = spyOn(processFlightDataServiceStub, 'sortArrivalAsc');
    const getSortTechnique = spyOn(processFlightDataServiceStub, 'getSortTechnique').and.returnValue('arrival');

    component.sortData(flights);

    expect(getSortTechnique).toHaveBeenCalled();
    expect(sortArrivalAscSpy).toHaveBeenCalledOnceWith(flights);
  });

  it('should call sortAirlinesAsc', () =>{
    const sortAirlinesAscSpy = spyOn(processFlightDataServiceStub, 'sortAirlinesAsc');
    const getSortTechnique = spyOn(processFlightDataServiceStub, 'getSortTechnique').and.returnValue('ascAirlines');

    component.sortData(flights);

    expect(getSortTechnique).toHaveBeenCalled();
    expect(sortAirlinesAscSpy).toHaveBeenCalledOnceWith(flights);
  });

  it('should call sortAirlinesDsc', () =>{
    const sortAirlinesDscSpy = spyOn(processFlightDataServiceStub, 'sortAirlinesDsc');
    const getSortTechnique = spyOn(processFlightDataServiceStub, 'getSortTechnique').and.returnValue('dscAirlines');

    component.sortData(flights);

    expect(getSortTechnique).toHaveBeenCalled();
    expect(sortAirlinesDscSpy).toHaveBeenCalledOnceWith(flights);
  });

  it('should call sortData' , ()  =>{
    spyOn(dataServiceStub, 'fetchFlightData').and.returnValue(of(flights));
    const sortDataSpy = spyOn(component, 'sortData');

    component.fetchFlightData();

    expect(sortDataSpy).toHaveBeenCalledWith(flights);
  })
});
