import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import Customer from '../../models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getCustomers() {
    return this.http.get(`${this.baseUrl}/customers`);
  }

  getCustomerById(id: number) {
    return this.http.get(`${this.baseUrl}/customers/${id}`);
  }

  deleteCustomer(id: number) {
    return this.http.delete(`${this.baseUrl}/customers/${id}`);
  }

  public createCustomer(customer: Customer) {
    return this.http.post(`${this.baseUrl}/customers`, customer);
  }

  updateCustomer(id: number, customer: Customer) {
    return this.http.put(`${this.baseUrl}/customers/${id}`, customer);
  }
}
