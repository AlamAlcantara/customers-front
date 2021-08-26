import { Component, OnInit } from '@angular/core';
import {CustomersService} from '../../../shared/services/customers/customers.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private customersService: CustomersService) { }

  ngOnInit() {
    this.customersService.getCustomers().subscribe((res: any) => {
      console.log('CUSTOMERS RESPONSE: ', res);
    });
  }

}
