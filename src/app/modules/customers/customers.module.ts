import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersRoutingModule } from './customers-routing.module';
import { HomeComponent } from './pages/home/home.component';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    CustomersRoutingModule
  ]
})
export class CustomersModule { }
