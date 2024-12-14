import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PinI } from '../../models/pin';

@Injectable({
  providedIn: 'root'
})
export class PinsService {

  baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getPins(): PinI[] {
    const pins = localStorage.getItem('pins');
    return pins ? JSON.parse(pins) : [];
  }

  checkIfPinExists(title: string): boolean {
    const pins = this.getPins();
    return !!pins.find(p => p.title === title);
  }

  addPin(pin: PinI){
    const pins = this.getPins();
    pins.push(pin);
    localStorage.setItem('pins', JSON.stringify(pins));
  }

  getAllPinImages(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/images`);
  }

  getPinImage(image: string): any {
    return this.http.get(`${this.baseUrl}/images/${image}`);
  }
}