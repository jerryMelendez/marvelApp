import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ComicService {

  private apikey = `${environment.marvelPublicKey}&ts=${environment.marvelTimeStamp}&hash=${environment.marvelHash}`;

  constructor(
    private http: HttpClient
  ) { }

  // Obtiene todos los comics
  getComics(limit = null, offset = null): Observable<any>
  {
    if (limit === null && offset === null)
    {
      return this.http.get(`https://gateway.marvel.com:443/v1/public/comics?apikey=${this.apikey}`);
    }
    else
    {
      return this.http.get(`https://gateway.marvel.com:443/v1/public/comics?apikey=${this.apikey}&limit=${limit}&offset=${offset}`);
    }
  }

  // Obtiene un registro
  show(id): Observable<any>
  {
    return this.http.get(`https://gateway.marvel.com:443/v1/public/comics/${id}?apikey=${this.apikey}`);
  }

  // Obtiene los personajes del comic
  getCharacters(id): Observable<any>
  {
    return this.http.get(`https://gateway.marvel.com:443/v1/public/comics/${id}/characters?apikey=${this.apikey}`);
  }
}
