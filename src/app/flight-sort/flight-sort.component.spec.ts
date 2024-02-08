import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { ProcessFlightDataService } from '../services/process-flight-data.service';

import { ProcessFlightDataServiceStub } from '../services/service.stub';

import { FlightSortComponent } from './flight-sort.component';

describe('FlightSortComponent', () => {
  let component: FlightSortComponent;
  let fixture: ComponentFixture<FlightSortComponent>;
  let processFlightDataServiceStub: ProcessFlightDataServiceStub;
  let mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(async () => {
    processFlightDataServiceStub = new ProcessFlightDataServiceStub();

    await TestBed.configureTestingModule({
      declarations: [ FlightSortComponent ],
      providers: [
        {provide: Router, useValue: mockRouter},
        {provide: ProcessFlightDataService, useValue: processFlightDataServiceStub}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate flight-results page', () =>{
    const setSortTechniqueSpy = spyOn(processFlightDataServiceStub, 'setSortTechnique');

    component.sort();

    expect(setSortTechniqueSpy).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/flight-results']);
  })
});
