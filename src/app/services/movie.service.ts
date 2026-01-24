import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private apiUrl = 'http://www.omdbapi.com/';
  private apiKey = '88585a32';

  private http = inject(HttpClient);

  getMovies(search: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?apikey=${this.apiKey}&s=${search}&type=movie&page=1`);
  }
}
