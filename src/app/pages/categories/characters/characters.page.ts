import { Component, OnInit } from '@angular/core';
import { CharacterService } from 'src/app/services/character.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.page.html',
  styleUrls: ['./characters.page.scss'],
})
export class CharactersPage implements OnInit {

  public arrayCharacters: any[] = [];
  constructor(
    private charactersService: CharacterService
  ) {}

  ngOnInit() {
    // this.showCharacter(1011334);
    // this.getComics(1011334);
    this.getCharacters();
  }

  getCharacters()
  {
    this.charactersService.getCharacters(0, 100).subscribe(
      response => {
        console.log(response);
        if (response.code === 200)
        {
          this.arrayCharacters = response.data.results;
        }
      },
      error => {
        console.log(error);
      }
    )
  }

  showCharacter(id)
  {
    this.charactersService.show(id).subscribe(
      response => {
        console.log(response);
      }
    )
  }

  getComics(id)
  {
    this.charactersService.getComics(id).subscribe(
      response => {
        console.log(response);
      }
    )
  }

}