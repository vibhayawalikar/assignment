import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flight-fliter',
  templateUrl: './flight-fliter.component.html',
  styleUrls: ['./flight-fliter.component.scss']
})
export class FlightFliterComponent implements OnInit {
  filterForm: FormGroup;
  economy: FormControl;
  businessClass: FormControl;
  filters: any;
  minimumRate: FormControl;
  maximumRate: FormControl;

  constructor(private readonly router: Router) { }

  ngOnInit(): void {
    this.filterForm = this.initializeForm();
  }

  initializeForm(){
    this.filters = JSON.parse(sessionStorage.getItem('filters') as any)
    return new FormGroup({
      economy: new FormControl(this.filters?.economy || null),
      businessClass: new FormControl(this.filters?.businessClass || null),
      minimumRate: new FormControl(this.filters?.minimumRate || null),
      maximumRate: new FormControl(this.filters?.maximumRate || null)
    });
  }

  clear(){
    this.filterForm.reset();
  }

  save(){
    sessionStorage.setItem('filters', JSON.stringify(this.filterForm.getRawValue()));
    this.router.navigate(['/flight-results']);
  }

}
