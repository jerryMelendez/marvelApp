import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SeriesService {

  private apikey = `${environment.marvelPublicKey}&ts=${environment.marvelTimeStamp}&hash=${environment.marvelHash}`;

  constructor(
    private http: HttpClient
  ) { }

  // Obtiene las series
  getSeries(limit = null, offset = null): Observable<any>
  {
    if (limit === null && offset === null)
    {
      return this.http.get(`https://gateway.marvel.com:443/v1/public/series?apikey=${this.apikey}`);
    }
    else
    {
      return this.http.get(`https://gateway.marvel.com:443/v1/public/series?apikey=${this.apikey}&limit=${limit}&offset=${offset}`);
    }
  }

  // Obtiene un registro
  show(id): Observable<any>
  {
    return this.http.get(`https://gateway.marvel.com:443/v1/public/series/${id}?apikey=${this.apikey}`);
  }

  // Obtiene los personajes de la serie
  getCharacters(id): Observable<any>
  {
    return this.http.get(`https://gateway.marvel.com:443/v1/public/series/${id}/characters?apikey=${this.apikey}`);
  }
}
