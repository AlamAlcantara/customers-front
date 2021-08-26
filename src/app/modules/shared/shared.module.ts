import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CustomersService} from './services/customers/customers.service';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [],
  providers: [CustomersService],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class SharedModule {
}
