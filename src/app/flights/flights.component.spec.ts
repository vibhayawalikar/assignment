import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { SearchFlightForm } from '../types/search-flight-form';

import { FlightsComponent } from './flights.component';

describe('FlightsComponent', () => {
  let component: FlightsComponent;
  let fixture: ComponentFixture<FlightsComponent>;
  let searchFormStub: FormGroup<SearchFlightForm>;
  let mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(async () => {
    const toDate = new Date();
    searchFormStub = new FormGroup({
      departure: new FormControl('banglore'),
      destination: new FormControl('pune'),
      departDate: new FormControl(new Date().toISOString().split('T')[0]),
      returnDate: new FormControl(new Date(toDate.setDate(toDate.getDate() + 1)).toISOString().split('T')[0]),
      travelers: new FormControl(),
      class: new FormControl('economy'),
      travelerStr: new FormControl('1 Adult')
    })

    await TestBed.configureTestingModule({
      declarations: [ FlightsComponent ],
      providers: [{provide: Router, useValue: mockRouter}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call initializeForm', () =>{
    const initializeFormValuesSpy = spyOn(component, 'initializeFormValues');

    component.ngOnInit();

    expect(initializeFormValuesSpy).toHaveBeenCalled();
  });

  it('should navigate flight-results page', () =>{
     component.searchForm = searchFormStub;
    spyOn(searchFormStub, 'markAllAsTouched');

    component.search();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/flight-results']);
  });

  it('should set traveler string', () =>{
    component.traveler = {adult: 1, children: 1}

    component.selectTraveler();
    
    expect(component.searchForm.value.travelerStr).toBe('1 Adult 1 Children');
  });

  it('should intialize form value', () =>{
    component.initializeFormValues();
    
    expect(component.searchForm.value.travelerStr).toBe('1 Adult');
    expect(component.classes.length).toBe(2);
  })

  it('should increment the number of adult travelers', () => {
    component.traveler = {adult: 0, children: 0};

    component.addAdult();

    expect(component.traveler.adult).toEqual(1);
  });

  it('should decrement the number of adult travelers', () => {
    component.traveler = {adult: 1, children: 0};

    component.removeAdult();

    expect(component.traveler.adult).toEqual(0);
  });

  it('should increment the number of children travelers', () => {
    component.traveler = {adult: 0, children: 0};

    component.addChildren();

    expect(component.traveler.children).toEqual(1);
  });

  it('should decrement the number of children travelers', () => {
    component.traveler = {adult: 0, children: 1};

    component.removeChildren();

    expect(component.traveler.children).toEqual(0);
  });
});
