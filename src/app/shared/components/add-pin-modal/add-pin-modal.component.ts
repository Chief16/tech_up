import { CustomerService } from './../../services/customer.service';
import { NgClass, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgbActiveModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSelectModule } from 'ngx-select-ex';
import { FileUploader, FileUploadModule } from 'ng2-file-upload';
import { PinI } from '../../models/pin';
import { PinsService } from '../../services/pins.service';
import { CustomerI } from '../../models/customer';

@Component({
  selector: 'app-add-pin-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgbModalModule,
    NgIf,
    NgxSelectModule,
    FileUploadModule,
    NgClass,
  ],
  providers: [CustomerService, PinsService],
  templateUrl: './add-pin-modal.component.html',
  styleUrl: './add-pin-modal.component.scss',
})
export class AddPinModalComponent implements OnInit {
  pinService = inject(PinsService);
  customerService = inject(CustomerService);

  pinForm: FormGroup;
  uploader: FileUploader;
  hasBaseDropZoneOver: boolean = false;
  response: string = '';
  hasFile = false;
  previewUrl: string | null = null;
  customerNames: string[] = [];

  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder) {
    this.pinForm = this.fb.group({
      title: ['', Validators.required],
      image: ['', Validators.required],
      collaborators: [[], Validators.required],
      privacy: ['Private', Validators.required],
    });
    this.uploader = new FileUploader({
      url: 'http://localhost:3000/api/upload', // Your local server endpoint
      itemAlias: 'image',
      autoUpload: false,
      allowedFileType: ['image'],
      maxFileSize: 10 * 1024 * 1024,
    });
  }

  ngOnInit() {
    this.getCustomerNames();
    this.uploader.onAfterAddingFile = (fileItem) => {
      fileItem.withCredentials = false; // Important for CORS
      this.hasFile = true;
      this.pinForm.patchValue({ image: fileItem._file.name });

      // Preview image
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.previewUrl = event.target.result;
      };
      reader.readAsDataURL(fileItem._file);

      if (this.uploader.queue.length > 1) {
        this.uploader.queue.shift();
      }
    };

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      try {
        const responseData = JSON.parse(response);
        console.log('Upload successful:', responseData);
        // Store the file path or handle success
      } catch (error) {
        console.error('Error parsing response:', error);
      }
    };

    this.uploader.onErrorItem = (item, response, status, headers) => {
      console.error('Upload failed:', response);
      // Handle error (show message to user, etc.)
    };
  }

  getCustomerNames() {
    this.customerNames = this.customerService.getCustomers().map((user) => user.title);
  }

  fileOverDropZone(e: boolean) {
    this.hasBaseDropZoneOver = e;
  }

  removeFile() {
    this.uploader.clearQueue();
    this.hasFile = false;
    this.previewUrl = null;
    this.pinForm.patchValue({ image: null });
  }

  submitForm() {
    if (this.pinForm.valid && this.hasFile) {
      const exists = this.pinService.checkIfPinExists(this.pinForm.value.title);
      if (exists) {
        this.pinForm.get('title')!.setErrors({ exists: true });
        return;
      }
      this.uploader.uploadAll();
      this.pinService.addPin(this.pinForm.value);
      this.activeModal.close(this.pinForm.value);
    }
  }
}
