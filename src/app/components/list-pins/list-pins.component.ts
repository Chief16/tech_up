import { Component, inject, OnInit, TemplateRef, viewChild } from '@angular/core';
import { LocationService } from '../../shared/services/location.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModal, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { AddPinModalComponent } from '../../shared/components/add-pin-modal/add-pin-modal.component';
import { NgClass, NgIf, SlicePipe } from '@angular/common';
import { PinsService } from '../../shared/services/pins.service';
import { PinI } from '../../shared/models/pin';
import { ToastService } from '../../shared/services/toast.service';

@Component({
  selector: 'app-list-pins',
  standalone: true,
  imports: [ReactiveFormsModule, NgbPaginationModule, FormsModule, NgClass, NgIf, SlicePipe],
  providers: [LocationService, PinsService],
  templateUrl: './list-pins.component.html',
  styleUrl: './list-pins.component.scss',
})
export class ListPinsComponent implements OnInit {
  locationService = inject(LocationService);
  pinsService = inject(PinsService);
  toastService = inject(ToastService);
  modalService = inject(NgbModal);

  successElement = viewChild('success');
  errorElement = viewChild('error');

  searchText = new FormControl<string>('', {nonNullable: true});

  itemsPerPage = 4;
  currentPage = 1;
  collectionSize = 0;

  pins: PinI[] = [];

  ngOnInit(): void {
    this.getPins();
  }

  getPins(){
    this.pins = this.pinsService.getPins();
    this.collectionSize = this.pins.length;
  }

  addPin( success: TemplateRef<string>, error: TemplateRef<string>) {
    const modalRef = this.modalService.open(AddPinModalComponent, {
      centered: true,
      backdrop: 'static',
    });

    modalRef.result.then(
      (result) => {
        console.log('Modal closed with result:', result);
        this.pinsService.addPin(result);
        this.getPins();
        this.toastService.show({ template: success });
      },
      (reason) => {
        console.log('Modal dismissed');
        this.toastService.show({ template: error, classname: 'bg-danger text-light' });
      }
    );
  }

  getFilteredPins() {
    const filteredPins = this.pins.filter((pin) => pin.title.includes(this.searchText.value));
    this.collectionSize = filteredPins.length;
    return filteredPins;
  }
}
