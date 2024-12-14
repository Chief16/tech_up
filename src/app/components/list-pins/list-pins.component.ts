import { Component, inject, model, OnInit, TemplateRef, viewChild } from '@angular/core';
import { LocationService } from '../../shared/services/location/location.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModal, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { AddPinModalComponent } from '../../shared/components/add-pin-modal/add-pin-modal.component';
import { NgClass, NgIf, SlicePipe } from '@angular/common';
import { PinI } from '../../shared/models/pin';
import { ToastService } from '../../shared/services/toast/toast.service';
import { PinsService } from '../../shared/services/pins/pins.service';

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

  pins: PinI[] = [];
  searchText = new FormControl<string>('', {nonNullable: true});
  itemsPerPage = 4;
  currentPage = 1;
  collectionSize = 0;

  ngOnInit(): void {
    this.getPins();
  }

  getPins(){
    this.pins = this.pinsService.getPins()
      .map((pin: PinI) => {
        return {
          ...pin,
          image: encodeURI(pin.image)
        }
      }).reverse();
    this.collectionSize = this.pins.length;
  }

  addPin( success: TemplateRef<string>, error: TemplateRef<string>, pin?: PinI) {
    const modalRef = this.modalService.open(AddPinModalComponent, {
      centered: true,
      backdrop: 'static',
    });
    modalRef.componentInstance.pin = pin;

    modalRef.result.then(
      (result) => {
        this.toastService.show({ template: success });
        this.getPins();
      },
      (reason) => {}
    );
  }

  deletePin(title: string, success: TemplateRef<any>, error: TemplateRef<any>): void {
    this.pinsService.deletePin(title);
    this.getPins();
  }

  getFilteredPins() {
    const filteredPins = this.pins.filter((pin) => pin?.title.includes(this.searchText.value));
    this.collectionSize = filteredPins.length;
    return filteredPins;
  }
}
