import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  private apikey = `${environment.marvelPublicKey}&ts=${environment.marvelTimeStamp}&hash=${environment.marvelHash}`;
  constructor(
    private http: HttpClient
  ) { }
  // Obtiene todos los personajes
  getCharacters(limit = null, offset = null): Observable<any>
  {
    if (limit === null && offset === null)
    {
      return this.http.get(`https://gateway.marvel.com:443/v1/public/characters?apikey=${this.apikey}`);
    }
    else
    {
      return this.http.get(`https://gateway.marvel.com:443/v1/public/characters?apikey=${this.apikey}&limit=${limit}&offset=${offset}`);
    }
  }

  // Muestra la informacion de un solo personaje
  show(id): Observable<any>
  {
    return this.http.get(`https://gateway.marvel.com:443/v1/public/characters/${id}?apikey=${this.apikey}`);
  }

  // Obtiene los comics en los que aparece un personaje
  getComics(id): Observable<any>
  {
    return this.http.get(`https://gateway.marvel.com:443/v1/public/characters/${id}/comics?apikey=${this.apikey}`);
  }


}
