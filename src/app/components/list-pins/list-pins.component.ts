import { Component, inject, OnInit } from '@angular/core';
import { LocationService } from '../../shared/services/location.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModal, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { AddCustomerModalComponent } from '../../shared/components/add-customer-modal/add-customer-modal.component';
import { AddPinModalComponent } from '../../shared/components/add-pin-modal/add-pin-modal.component';
import { NgClass } from '@angular/common';

const PINS = [
  {
    title: 'Pin 1',
    image: 'https://via.placeholder.com/150',
    collabatory: ['User 1', 'User 2'],
    privacy: 'Public',
  },
  {
    title: 'Pin 2',
    image: 'https://via.placeholder.com/150',
    collabatory: ['User 3', 'User 4'],
    privacy: 'Private',
  },
  {
    title: 'Pin 3',
    image: 'https://via.placeholder.com/150',
    collabatory: ['User 5', 'User 6'],
    privacy: 'Public',
  },
  {
    title: 'Pin 4',
    image: 'https://via.placeholder.com/150',
    collabatory: ['User 7', 'User 8'],
    privacy: 'Private',
  },
];

interface Pins {
  title: string;
  image: string;
  collabatory: string[];
  privacy: 'Public' | 'Private';
}

@Component({
  selector: 'app-list-pins',
  standalone: true,
  imports: [ReactiveFormsModule, NgbPaginationModule, FormsModule, NgClass],
  templateUrl: './list-pins.component.html',
  styleUrl: './list-pins.component.scss',
})
export class ListPinsComponent implements OnInit {
  locationService = inject(LocationService);
  modalService = inject(NgbModal);

  searchText = new FormControl<string>('', {nonNullable: true});

  itemsPerPage = 4;
  currentPage = 1;
  collectionSize = PINS.length;

  pins: any[] = [];

  ngOnInit(): void {
    this.refreshCountries();
    this.searchText.valueChanges.subscribe((value) => {
      this.pins = PINS.filter((pin) => pin.title.includes(value));
    });
  }

  addCustomer() {
    const modalRef = this.modalService.open(AddCustomerModalComponent, {
      centered: true,
      backdrop: 'static',
    });

    modalRef.result.then(
      (result) => {
        console.log('Modal closed with result:', result);
        // Handle the form submission result here
      },
      (reason) => {
        console.log('Modal dismissed');
      }
    );
  }

  addPin() {
    const modalRef = this.modalService.open(AddPinModalComponent, {
      centered: true,
      backdrop: 'static',
    });

    modalRef.result.then(
      (result) => {
        console.log('Modal closed with result:', result);
        // Handle the form submission result here
      },
      (reason) => {
        console.log('Modal dismissed');
      }
    );
  }

  refreshCountries() {
    this.pins = PINS.map((pin, i) => ({ id: i + 1, ...pin })).slice(
      (this.currentPage - 1) * this.itemsPerPage,
      (this.currentPage - 1) * this.itemsPerPage + this.itemsPerPage
    );
  }
}
