import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SearchFlightForm } from '../types/search-flight-form';
import { dateValidator, locationValidator } from '../validators';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.scss']
})

export class FlightsComponent implements OnInit {
  searchForm: FormGroup<SearchFlightForm>;
  departure: FormControl<string>;
  destination: FormControl<string>;
  departDate: FormControl<string>;
  returnDate: FormControl<string>;
  travelers: FormControl<string>;
  class: FormControl<string>;
  travelerStr: FormControl<string>;
  classes: {label: string, value: string}[];
  toDate: Date = new Date();
  cities: string[];
  traveler: {adult: number, children: number};
  open:boolean = false;

  constructor(private readonly router : Router) { }

  ngOnInit(): void {
    this.searchForm = this.initializeForm();
    this.initializeFormValues();
  }

  initializeForm(){
    return new FormGroup<SearchFlightForm>({
      departure: new FormControl('', Validators.required),
      destination: new FormControl('', Validators.required),
      departDate: new FormControl(new Date().toISOString().split('T')[0],[Validators.required]),
      returnDate: new FormControl(new Date(this.toDate.setDate(this.toDate.getDate() + 1)).toISOString().split('T')[0], [Validators.required]),
      travelers: new FormControl(),
      class: new FormControl('economy'),
      travelerStr: new FormControl('')
    }, {validators : [dateValidator(), locationValidator()]});
  }

  initializeFormValues(){
    this.cities = ['Delhi', 'Mumbai', 'Bangalore', 'Pune', 'Kolkata'];
    this.classes = [{value: 'economy', label: "Economy"},
    {value: 'business', label: "Business"}];
    this.traveler = { adult: 1, children: 0};
    this.traveler.children > 0 ?  this.searchForm.controls['travelerStr'].patchValue(`${this.traveler.adult} Adult ${this.traveler.children} Children`)  :  
    this.searchForm.controls['travelerStr'].patchValue(`${this.traveler.adult} Adult`);
  }

  addAdult(){
    this.traveler.adult += 1;
  }

  removeAdult(){
    this.traveler.adult -= 1;
  }

  addChildren(){
    this.traveler.children += 1;
  }

  removeChildren(){
    this.traveler.children -= 1;
  }

  selectTraveler(){ 
    this.open = false;
    this.searchForm.controls['travelers'].patchValue(this.traveler);
    this.traveler.children > 0 ?  this.searchForm.controls['travelerStr'].patchValue(`${this.traveler.adult} Adult ${this.traveler.children} Children`)  :  
    this.searchForm.controls['travelerStr'].patchValue(`${this.traveler.adult} Adult`);
  }

  toggle(){
    this.open = !this.open;
  }

  search(){
    this.searchForm.markAllAsTouched();

    if(this.searchForm.valid){
      this.router.navigate(['/flight-results'])
      sessionStorage.setItem('form', JSON.stringify(this.searchForm.value));
    }

  }
}
