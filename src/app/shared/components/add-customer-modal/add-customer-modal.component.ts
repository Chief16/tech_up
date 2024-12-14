import { AsyncPipe, NgFor, NgForOf, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { LocationService } from '../../services/location.service';
import { NgxSelectModule } from 'ngx-select-ex';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-customer-modal',
  standalone: true,
  imports: [ReactiveFormsModule, NgbModalModule, NgIf, NgFor, AsyncPipe, NgxSelectModule],
  templateUrl: './add-customer-modal.component.html',
  styleUrl: './add-customer-modal.component.scss'
})
export class AddCustomerModalComponent implements OnInit {

  activeModal = inject(NgbActiveModal);
  locationService = inject(LocationService);

  regions = this.locationService.getRegions();
  countries: string[] = [];

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
  }

  submitForm() {
    if (this.userForm.valid) {
      this.activeModal.close(this.userForm.value);
    } else {
      Object.keys(this.userForm.controls).forEach(key => {
        const control = this.userForm.get(key);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
    }
  }
}
