import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  httpClient = inject(HttpClient);

  API_URL = 'https://api.first.org/data/v1/countries';

  getRegions(): Observable<any> {
    return this.httpClient.get("data.json").pipe(
      map((response: any) => {
        const regions = new Set<string>();
        Object.values(response.data).forEach((countryData: any) => {
          regions.add(countryData.region);
        });
        return Array.from(regions).sort();
      })
    );
  }

  getCountriesByRegion(region: string): Observable<string[]> {
    return this.httpClient.get("data.json").pipe(
      map((response: any) => {
        return Object.values(response.data)
          .filter((countryData: any) => countryData.region === region)
          .map((countryData: any) => countryData.country);
      })
    )
  }
}
