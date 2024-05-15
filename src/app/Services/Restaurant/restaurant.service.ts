import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private apiUrl = 'http://localhost:8000/api/v1/restaurantes/'; // Reemplaza con tu URL de la API

  constructor(private http: HttpClient) {}

  getRestaurants(filters: any = {}): Observable<any> {
    let params = new HttpParams();
    for (const key in filters) {
      if (filters[key]) {
        params = params.set(key, filters[key]);
      }
    }
    return this.http.get<any>(this.apiUrl, { params });
  }
}
