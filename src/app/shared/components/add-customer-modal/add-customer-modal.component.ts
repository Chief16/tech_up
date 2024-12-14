import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { LocationService } from '../../services/location/location.service';
import { NgxSelectModule } from 'ngx-select-ex';
import { CustomerService } from '../../services/customer/customer.service';
import { CustomerI } from '../../models/customer';

@Component({
  selector: 'app-add-customer-modal',
  standalone: true,
  imports: [ReactiveFormsModule, NgbModalModule, NgIf, AsyncPipe, NgxSelectModule],
  providers: [CustomerService],
  templateUrl: './add-customer-modal.component.html',
  styleUrl: './add-customer-modal.component.scss'
})
export class AddCustomerModalComponent implements OnInit {

  customerService = inject(CustomerService);
  activeModal = inject(NgbActiveModal);
  locationService = inject(LocationService);

  regions = this.locationService.getRegions();
  countries: string[] = [];
  customer = null;

  userForm = new FormGroup({
    title: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    region: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required)
  });

  ngOnInit(): void {
    this.userForm.get('region')?.valueChanges.subscribe((region) => {
      if(region)
      this.locationService.getCountriesByRegion(region).subscribe(x => this.countries = x);
    });
    if(this.customer){
      this.userForm.patchValue(this.customer);
      this.userForm.get('title')?.disable();
    }
  }

  submitForm() {
    if (this.userForm.valid) {
      if(this.customer){
        this.customerService.updateCustomer(this.userForm.getRawValue() as CustomerI);
      } else {
        const exists = this.customerService.checkIfCustomerExists(this.userForm.value.title as string);
        if(exists) {
          this.userForm.get('title')?.setErrors({exists: true});
          this.userForm.markAllAsTouched();
          return;
        }
        this.customerService.addCustomers(this.userForm.value as CustomerI);
      }
      this.activeModal.close(true);
    } else {
      this.userForm.markAllAsTouched();
    }
  }
}
