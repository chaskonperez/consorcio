import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(private http: HttpClient) { }

  locales() {
    return this.http.get('http://localhost:3000/locales');
  }

  comunas() {
    return this.http.get('http://localhost:3000/comunas');
  }
}
