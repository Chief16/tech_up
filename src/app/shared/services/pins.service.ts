import { Injectable } from '@angular/core';
import { PinI } from '../models/pin';

@Injectable({
  providedIn: 'root'
})
export class PinsService {

  getPins(): PinI[] {
    const pins = localStorage.getItem('pins');
    return pins ? JSON.parse(pins) : [];
  }

  addPin(pin: PinI){
    const pins = this.getPins();
    pins.push(pin);
    localStorage.setItem('pins', JSON.stringify(pins));
  }
}
