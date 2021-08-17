import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { CharacterService } from 'src/app/services/character.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.page.html',
  styleUrls: ['./characters.page.scss'],
})
export class CharactersPage implements OnInit {

  public arrayCharacters: any[] = [];
  public identity: any = {};
  public pageTitle: string = 'Characters';
  public bandFavoritePage: boolean = false; // Bandera que indicará si se están viendo los personajes favoritos o todos los demás
  constructor(
    private charactersService: CharacterService,
    private alertService: AlertService,
    private userService: UserService
  ) {}

  async ngOnInit() {
    // this.showCharacter(1011334);
    // this.getComics(1011334);
    this.identity = await this.userService.getIdentity();

    // Obtenemos el parametro favorites en la ruta para saber si el usuario quiere ver sus favoritos o todos los personajes
    const band = this.getParameterByName('favorites');
    if (band === 'true') // Si quiere ver los favoritos se cargarán de storage
    {
      this.bandFavoritePage = true;
      this.getFavoriteCharacters();
      this.pageTitle = 'Favorite Characters';
    }
    else // Si quiere verlos todos se cargarán del api de marvel
    {
      this.getCharacters();
    }
  }

  // Metodo que obtiene el valor de un parametro en la ruta, los parametros de estilo url...?variable=valor
  getParameterByName(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    // tslint:disable-next-line: one-variable-per-declaration
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)'),
    results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  }

  // Obtiene los personajes del api
  getCharacters(name: string = null)
  {
    this.charactersService.getCharacters(0, 100, name).subscribe(
      response => {
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

  // Obtiene los personajes favoritos del storage
  async getFavoriteCharacters()
  {
    this.arrayCharacters = await this.charactersService.getFavoriteCharacters(this.identity.uid);
  }

  // Recibe del componente panel-search el texto de busqueta y hace la consulta al api
  onTypeEmitted(event)
  {
    this.alertService.showLoading();
    this.getCharacters(event !== '' ? event : null);
  }

  onTypeEmittedCharacterPanel(event)
  {
    if (this.bandFavoritePage)
    {
      this.getFavoriteCharacters();
    }
  }
}
