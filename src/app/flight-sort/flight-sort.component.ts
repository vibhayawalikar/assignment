import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProcessFlightDataService } from '../services/process-flight-data.service';

@Component({
  selector: 'app-flight-sort',
  templateUrl: './flight-sort.component.html',
  styleUrls: ['./flight-sort.component.scss']
})
export class FlightSortComponent implements OnInit {
  sortingType: string;

  constructor(private readonly router: Router, private readonly processFlightDataService: ProcessFlightDataService) { }

  ngOnInit(): void {
    this.sortingType = this.processFlightDataService.getSortTechnique();
  }

  sort(){
    this.processFlightDataService.setSortTechnique(this.sortingType);
    this.router.navigate(['/flight-results'])
  }

}
