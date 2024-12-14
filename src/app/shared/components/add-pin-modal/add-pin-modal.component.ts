import { NgIf, NgFor, AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import {INgxSelectOption, NgxSelectModule} from 'ngx-select-ex';

@Component({
  selector: 'app-add-pin-modal',
  standalone: true,
  imports: [ReactiveFormsModule, NgbModalModule, NgIf, NgxSelectModule],
  templateUrl: './add-pin-modal.component.html',
  styleUrl: './add-pin-modal.component.scss'
})
export class AddPinModalComponent {
  
  activeModal = inject(NgbActiveModal);
  pinForm = new FormGroup({
    title: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
    collaborators: new FormControl([], Validators.required),
    privacy: new FormControl('private', Validators.required)
  });
  collaborators: INgxSelectOption[] = [
    { value: 'User 1', text: 'User 1', disabled: false, data: null },
    { value: 'User 2', text: 'User 2', disabled: false, data: null },
    { value: 'User 3', text: 'User 3', disabled: false, data: null },
    { value: 'User 4', text: 'User 4', disabled: false, data: null },
    { value: 'User 5', text: 'User 5', disabled: false, data: null },
    { value: 'User 6', text: 'User 6', disabled: false, data: null },
    { value: 'User 7', text: 'User 7', disabled: false, data: null },
    { value: 'User 8', text: 'User 8', disabled: false, data: null }
  ];
  collaboratorsControl = new FormControl();

  submitForm() {
    if (this.pinForm.valid) {
      this.activeModal.close(this.pinForm.value);
    } else {
      Object.keys(this.pinForm.controls).forEach(key => {
        const control = this.pinForm.get(key);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
    }
  }
}
