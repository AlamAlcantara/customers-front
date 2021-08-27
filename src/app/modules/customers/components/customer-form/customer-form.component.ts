import { Component, OnInit } from '@angular/core';
import Customer from '../../../shared/models/customer';
import {FormBuilder, FormGroup, Validators, FormArray} from '@angular/forms';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material';
import {CustomersService} from '../../../shared/services/customers/customers.service';
import {ActivatedRoute, Router} from '@angular/router';
import Address from '../../../shared/models/address';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent implements OnInit {

  customer: Customer = {name: '', lastName: '', email: '', addresses: []};
  emptyAddress: Address = {street: '', city: '', description: '', zip: ''};
  customerForm: FormGroup;
  addresses: FormArray;
  savingCustomer = false;
  isEditing = false;

  // Snackbar position
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private customersService: CustomersService,
              private fb: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.loadCustomerFromParam();
    this.buildFormGroup();
  }

  loadCustomerFromParam() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    if (id) {
      this.isEditing = true;

      // tslint:disable-next-line:radix
      this.customersService.getCustomerById( Number.parseInt(id) )
        .subscribe((resp: any) => {
            if (!resp.error) {
              this.customer = resp;
              this.buildFormGroup();
              this.loadAddressesIntoForm();
            }
          },
          (err) => {
            this.router.navigate(['/']);
            this.openSnackBar('Cliente no encontrado', 'Ok');
          });
    }
  }

  buildFormGroup() {
    this.customerForm = this.fb.group({
      name: [this.customer.name, Validators.required],
      lastName: [this.customer.lastName, Validators.required],
      email: [this.customer.email, [Validators.required, Validators.email]],
      addresses: this.fb.array([this.createAddressForm()])
    });
  }

  loadAddressesIntoForm() {
    this.removeAddress(0);

    const addresses = this.customerForm.get('addresses') as FormArray;
    // tslint:disable-next-line:no-shadowed-variable
    this.customer.addresses.forEach( address => {
      addresses.push(this.createAddressForm(address));
    });
  }

  // tslint:disable-next-line:no-shadowed-variable
  createAddressForm(address: Address = this.emptyAddress): FormGroup {
    return this.fb.group({
      id: [address.id || null],
      street: [address.street || '', Validators.required],
      city: [address.city || '', Validators.required],
      description: [address.description || '', Validators.required],
      zip: [address.zip || '']
    });
  }

  addAddress() {
    const addresses = this.customerForm.get('addresses') as FormArray;
    addresses.push(this.createAddressForm());
  }

  removeAddress(index: number) {
    const addresses = this.customerForm.get('addresses') as FormArray;
    addresses.removeAt(index);
  }

  openSnackBar(message: string, actionText: string) {
    this.snackBar.open(message, actionText,
      {duration: 5000, horizontalPosition: this.horizontalPosition, verticalPosition: this.verticalPosition});
  }

  createClient() {
    this.customersService.createCustomer(this.customer).subscribe((res: any) => {
      this.router.navigate(['/']);
      this.showConfirmationMessage();
    }, (err) => {
      this.router.navigate(['/']);
      this.openSnackBar('Error creando cliente', 'Ok');
    });
  }

  updateClient() {
    this.customersService.updateCustomer(this.customer.id, this.customer).subscribe((res: any) => {
      this.router.navigate(['/']);
      this.showConfirmationMessage();
    }, (err) => {
      this.router.navigate(['/']);
      this.openSnackBar('Error actualizando cliente', 'Ok');
    });
  }

  onSubmit() {
    Object.assign(this.customer, this.customerForm.value);

    if (this.isEditing) {
      this.updateClient();
    } else {
      this.createClient();
    }
  }

  showConfirmationMessage() {
    const message = this.isEditing ? 'Cliente actualizado' : 'Cliente creado';
    this.openSnackBar(message, 'Ok');
  }

}
