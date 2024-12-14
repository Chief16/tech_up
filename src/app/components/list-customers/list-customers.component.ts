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

  successElement = viewChild<TemplateRef<any>>('success');
  errorElement = viewChild<TemplateRef<any>>('error');

  searchText = new FormControl<string>('', {nonNullable: true});

  itemsPerPage = 4;
  currentPage = 1;
  collectionSize = 0;

  customers: CustomerI[] = [];

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers(){
    this.customers = this.customerService.getCustomers();
    this.collectionSize = this.customers.length;
  }

  addCustomer(success: TemplateRef<any>, error: TemplateRef<any>) {
    const modalRef = this.modalService.open(AddCustomerModalComponent, {
      centered: true,
      backdrop: 'static',
    });

    modalRef.result.then(
      (result) => {
        this.getCustomers();
        this.toastService.show({ template: success });
      },
      (reason) => {
        console.log('Modal dismissed');
        this.toastService.show({ template: error});
      }
    );
  }

  getFilteredPins() {
    const filteredPins = this.customers.filter((cus) => cus.title.includes(this.searchText.value));
    this.collectionSize = filteredPins.length;
    return filteredPins;
  }
}
