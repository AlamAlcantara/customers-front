import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getCustomers() {
    return this.http.get(`${this.baseUrl}/customers`);
  }
}
