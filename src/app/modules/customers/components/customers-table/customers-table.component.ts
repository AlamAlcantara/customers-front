import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatTableDataSource} from '@angular/material';
import Customer from '../../../shared/models/customer';
import {CustomersService} from '../../../shared/services/customers/customers.service';

@Component({
  selector: 'app-customers-table',
  templateUrl: './customers-table.component.html',
  styleUrls: ['./customers-table.component.scss']
})
export class CustomersTableComponent implements OnInit {

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  displayedColumns: string[] = ['name', 'lastName', 'email', 'actions'];
  customers: Customer[];
  dataSource = new MatTableDataSource<Customer>(this.customers);
  loadingCustomers = false;

  // Snackbar position
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private customersService: CustomersService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.loadCustomers();
  }

  loadCustomers() {
    this.loadingCustomers = true;

    this.customersService.getCustomers().subscribe((res: any) => {
      this.loadingCustomers = false;
      this.customers = res;
      this.dataSource = new MatTableDataSource<Customer>(this.customers);
      this.dataSource.paginator = this.paginator;
    }, (err) => {
      this.loadingCustomers = false;
      this.openSnackBar('Error al cargar clientes, inténtelo más tarde.', 'Ok');
    });
  }

  openSnackBar(message: string, actionText: string) {
    this.snackBar.open(message, actionText,
      {duration: 5000,  horizontalPosition: this.horizontalPosition, verticalPosition: this.verticalPosition});
  }

  // openDialog(customer: Customer) {
  //   const dialogRef = this.dialog.open(ConfirmationModalComponent, {
  //     width: '250px',
  //     data: {
  //       student,
  //       title: 'Eliminar Cliente',
  //       message: `Seguro que desea eliminar a ${customer.name} ${customer.lastName} ?`,
  //       onConfirm: (studentId) => this.deleteStudent(studentId)
  //     }
  //   });
  // }

}
