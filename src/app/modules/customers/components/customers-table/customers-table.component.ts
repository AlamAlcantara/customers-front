import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {
  MatDialog,
  MatPaginator,
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
  MatTableDataSource
} from '@angular/material';
import Customer from '../../../shared/models/customer';
import {CustomersService} from '../../../shared/services/customers/customers.service';
import {ConfirmationModalComponent} from '../confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-customers-table',
  templateUrl: './customers-table.component.html',
  styleUrls: ['./customers-table.component.scss']
})
export class CustomersTableComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  @Input() set customers(customers: Customer[]) {
    this.customersData = customers;
    this.fillTable();
  }

  customersData: Customer [];
  displayedColumns: string[] = ['name', 'lastName', 'email', 'actions'];
  dataSource = new MatTableDataSource<Customer>(this.customersData);

  // Snackbar position
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private customersService: CustomersService,
              private snackBar: MatSnackBar,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.fillTable();
  }

  ngAfterViewInit(): void {
    this.fillTable();
  }

  fillTable() {
    this.dataSource = new MatTableDataSource<Customer>(this.customersData);
    this.dataSource.paginator = this.paginator;
  }

  openSnackBar(message: string, actionText: string) {
    this.snackBar.open(message, actionText,
      {duration: 5000,  horizontalPosition: this.horizontalPosition, verticalPosition: this.verticalPosition});
  }

  deleteCustomer(id: number) {
    this.customersService.deleteCustomer(id).subscribe( (resp: any) => {
        const index = this.customersData.findIndex(c => c.id === id);
        this.customersData.splice(index, 1);
        this.fillTable();
        this.openSnackBar('Cliente Eliminado', 'Ok');
      },
      (err) => {
        this.openSnackBar('Error al eliminar cliente, inténtelo más tarde.', 'Ok');
      });
  }

  openDialog(customer: Customer) {
    this.dialog.open(ConfirmationModalComponent, {
      width: '250px',
      data: {
        customer,
        title: 'Eliminar Cliente',
        message: `Seguro que desea eliminar a ${customer.name} ${customer.lastName} ?`,
        onConfirm: (customerId) => this.deleteCustomer(customerId)
      }
    });
  }

}
