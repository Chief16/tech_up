import { CustomerService } from './../../services/customer.service';
import { NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgbActiveModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { INgxSelectOption, NgxSelectModule } from 'ngx-select-ex';

@Component({
  selector: 'app-add-pin-modal',
  standalone: true,
  imports: [ReactiveFormsModule, NgbModalModule, NgIf, NgxSelectModule],
  providers: [CustomerService],
  templateUrl: './add-pin-modal.component.html',
  styleUrl: './add-pin-modal.component.scss',
})
export class AddPinModalComponent implements OnInit {
  customerService = inject(CustomerService);
  activeModal = inject(NgbActiveModal);
  pinForm = new FormGroup({
    title: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
    collaborators: new FormControl([], Validators.required),
    privacy: new FormControl('private', Validators.required),
  });
  collaborators: INgxSelectOption[] = [];
  collaboratorsControl = new FormControl();

  ngOnInit(): void {
    this.collaborators = this.customerService.getCustomers().map((customer) => ({
      value: customer.email,
      text: customer.title,
      disabled: false,
      data: customer,
    }));
  }

  submitForm() {
    if (this.pinForm.valid) {
      this.activeModal.close(this.pinForm.value);
    } else {
      Object.keys(this.pinForm.controls).forEach((key) => {
        const control = this.pinForm.get(key);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
    }
  }
}
