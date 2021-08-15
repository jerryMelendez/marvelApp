import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(
    private http: HttpClient
  ) { }

  getCharacters(): Observable<any>
  {
    return this.http.get(`https://gateway.marvel.com:443/v1/public/characters?apikey=${environment.marvelPublicKey}&ts=${environment.marvelTimeStamp}&hash=${environment.marvelHash}`);
  }
}
