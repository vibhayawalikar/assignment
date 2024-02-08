import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { FlightFliterComponent } from './flight-fliter.component';

describe('FlightFliterComponent', () => {
  let component: FlightFliterComponent;
  let fixture: ComponentFixture<FlightFliterComponent>;
  let mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlightFliterComponent ],
      providers: [{provide: Router, useValue: mockRouter}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlightFliterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with default values from sessionStorage', () => {
    spyOn(sessionStorage, 'getItem').and.returnValue(JSON.stringify({}));

    component.initializeForm();

    expect(component.filterForm.value).toEqual({
      economy: null,
      businessClass: null,
      minimumRate: null,
      maximumRate: null
    });
  });

  it('should clear the form', () => {
    component.filterForm.setValue({
      economy: 'value',
      businessClass: 'value',
      minimumRate: 10,
      maximumRate: 100,
    });

    component.clear();

    expect(component.filterForm.value).toEqual({
      economy: null,
      businessClass: null,
      minimumRate: null,
      maximumRate: null
    });
  });

  it('should save the form values to sessionStorage and navigate to /flight-results', () => {
    spyOn(sessionStorage, 'setItem');

    component.filterForm.setValue({
      economy: 'value',
      businessClass: 'value',
      minimumRate: 10,
      maximumRate: 100,
    });

    component.save();

    expect(sessionStorage.setItem).toHaveBeenCalledWith('filters', JSON.stringify({
      economy: 'value',
      businessClass: 'value',
      minimumRate: 10,
      maximumRate: 100,
    }));

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/flight-results']);
  });
});
