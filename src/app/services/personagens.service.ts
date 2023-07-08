import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PersonagensService {

  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get<any>('https://swapi.dev/api/people/');
  }

  getNextData(url: string) {
    return this.http.get<any>(url);
  }

  getPreviousData(url: string) {
    return this.http.get<any>(url);
  }

  getStarships(url: string) {
    return this.http.get<any>(url);
  }

}
