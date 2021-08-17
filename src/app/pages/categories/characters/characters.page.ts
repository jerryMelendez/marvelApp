import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { CharacterService } from 'src/app/services/character.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.page.html',
  styleUrls: ['./characters.page.scss'],
})
export class CharactersPage implements OnInit {

  public arrayCharacters: any[] = [];
  constructor(
    private charactersService: CharacterService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    // this.showCharacter(1011334);
    // this.getComics(1011334);
    this.getCharacters();
  }

  getCharacters(name: string = null)
  {
    this.charactersService.getCharacters(0, 100, name).subscribe(
      response => {
        console.log(response);
        if (response.code === 200)
        {
          this.alertService.stopLoading();
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

  onTypeEmitted(event)
  {
    this.alertService.showLoading();
    this.getCharacters(event);
  }
}
