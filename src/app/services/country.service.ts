import { BASE_URL } from './../shared/urls';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Country } from '../shared/models/Country';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(
    private http: HttpClient
  ) { }

  getAllCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(BASE_URL + "/countries");
  }
}
