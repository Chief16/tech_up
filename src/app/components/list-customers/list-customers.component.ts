import { NgIf, SlicePipe } from '@angular/common';
import { Component, inject, TemplateRef, viewChild } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormControl } from '@angular/forms';
import { NgbPaginationModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddCustomerModalComponent } from '../../shared/components/add-customer-modal/add-customer-modal.component';
import { CustomerService } from '../../shared/services/customer/customer.service';
import { LocationService } from '../../shared/services/location/location.service';
import { CustomerI } from '../../shared/models/customer';
import { ToastService } from '../../shared/services/toast/toast.service';

@Component({
  selector: 'app-list-customers',
  standalone: true,
  imports: [ReactiveFormsModule, NgbPaginationModule, FormsModule, NgIf, SlicePipe],
  providers: [LocationService, CustomerService],
  templateUrl: './list-customers.component.html',
  styleUrl: './list-customers.component.scss'
})
export class ListCustomersComponent {
  customerService = inject(CustomerService);
  toastService = inject(ToastService);
  modalService = inject(NgbModal);

  customers: CustomerI[] = [];
  searchText = new FormControl<string>('', {nonNullable: true});
  itemsPerPage = 4;
  currentPage = 1;
  collectionSize = 0;

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers(){
    this.customers = this.customerService.getCustomers().reverse();
    this.collectionSize = this.customers.length;
  }

  addCustomer(success: TemplateRef<any>, error: TemplateRef<any>, customer?: CustomerI) {
    const modalRef = this.modalService.open(AddCustomerModalComponent, {
      centered: true,
      backdrop: 'static',
    });
    modalRef.componentInstance.customer = customer;

    modalRef.result.then(
      (result) => {
        this.getCustomers();
        this.toastService.show({ template: success });
      },
      (reason) => {}
    );
  }

  deleteCustomer(title: string, success: TemplateRef<any>, error: TemplateRef<any>): void {
    this.customerService.deleteCustomer(title);
    this.getCustomers();
  }

  getFilteredCustomers() {
    const filteredCustomers = this.customers.filter((cus) => cus.title.includes(this.searchText.value));
    this.collectionSize = filteredCustomers.length;
    return filteredCustomers;
  }
}
