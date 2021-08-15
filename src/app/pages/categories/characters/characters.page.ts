import { Component, OnInit } from '@angular/core';
import { CharacterService } from 'src/app/services/character.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.page.html',
  styleUrls: ['./characters.page.scss'],
})
export class CharactersPage implements OnInit {

  constructor(
    private charactersService: CharacterService
  ) {}

  ngOnInit() {
    this.getCharacters();
  }

  getCharacters()
  {
    this.charactersService.getCharacters().subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      }
    )
  }

}
