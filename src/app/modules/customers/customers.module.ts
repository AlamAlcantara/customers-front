import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { CustomersRoutingModule } from './customers-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { CustomersTableComponent } from './components/customers-table/customers-table.component';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';
import { CustomerFormComponent } from './components/customer-form/customer-form.component';
import { CustomerDetailsComponent } from './pages/customer-details/customer-details.component';

@NgModule({
  declarations: [
    HomeComponent,
    CustomersTableComponent,
    ConfirmationModalComponent,
    CustomerFormComponent,
    CustomerDetailsComponent],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatDialogModule,
    MatProgressSpinnerModule
  ],
   entryComponents: [ConfirmationModalComponent]
})
export class CustomersModule { }
