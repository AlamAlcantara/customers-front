import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CustomersService} from './services/customers/customers.service';


@NgModule({
  declarations: [],
  providers: [CustomersService],
  imports: [
    CommonModule
  ]
})
export class SharedModule {
}
