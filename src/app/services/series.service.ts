import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Serie {
  title: string;
  channel: string;
  rating: number;
}

export interface SerieResponse {
  id: number;
  title: string;
  channel: string;
  rating: number;
}

@Injectable({
  providedIn: 'root'
})
export class SeriesService {
  private apiUrl = 'https://peticiones.online/api/series';

  constructor(private http: HttpClient) {}

  getSeries(): Observable<Serie[]> {
    return this.http.get<Serie[]>(this.apiUrl);
  }

  create(payload: Serie): Observable<SerieResponse> {
    return this.http.post<SerieResponse>(this.apiUrl, payload);
  }
}
