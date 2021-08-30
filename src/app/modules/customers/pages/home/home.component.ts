import { Component, OnInit } from '@angular/core';
import {CustomersService} from '../../../shared/services/customers/customers.service';
import Customer from '../../../shared/models/customer';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  customers: Customer[];
  loadingCustomers = false;

  // Snackbar position
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private customersService: CustomersService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.loadCustomers();
  }

  loadCustomers() {
    this.loadingCustomers = true;

    this.customersService.getCustomers().subscribe((res: any) => {
      this.loadingCustomers = false;
      this.customers = res;
    }, (err) => {
      this.loadingCustomers = false;
      this.openSnackBar('Error al cargar clientes, inténtelo más tarde.', 'Ok');
    });
  }

  openSnackBar(message: string, actionText: string) {
    this.snackBar.open(message, actionText,
      {duration: 5000,  horizontalPosition: this.horizontalPosition, verticalPosition: this.verticalPosition});
  }

}
