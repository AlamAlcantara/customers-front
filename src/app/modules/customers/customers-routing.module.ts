import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {CustomerDetailsComponent} from './pages/customer-details/customer-details.component';


const routes: Routes = [
  {
    path: 'customer/:id',
    component: CustomerDetailsComponent
  },
  {
    path: 'customer',
    component: CustomerDetailsComponent
  },
  {
    path: '',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }
