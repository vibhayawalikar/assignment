import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Flights } from '../types/flights';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private readonly http: HttpClient) { }

  fetchFlightData(): Observable<Flights[]>{
    return this.http.get<Flights[]>('../../assets/flight-data.json');
  }
}
