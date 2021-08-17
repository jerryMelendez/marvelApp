import { Component, Input, OnInit } from '@angular/core';
import { Character } from 'src/app/interfaces/interfaces';
import { AlertService } from 'src/app/services/alert.service';
import { CharacterService } from '../../services/character.service';

@Component({
  selector: 'app-panel-character',
  templateUrl: './panel-character.component.html',
  styleUrls: ['./panel-character.component.scss'],
})
export class PanelCharacterComponent implements OnInit {

  @Input() character: Character;
  @Input() identity: any;
  public flagFavorite: boolean = false; // Bandera que se usa para mostrar si el personajes es favorito en el front
  constructor(
    private characterService: CharacterService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.checkFavorite();
  }

  // Comprobar si el personajes está añadido a favoritos
  async checkFavorite()
  {
    this.flagFavorite = await this.characterService.checkFavorite(this.character.id, this.identity.uid);
  }

  // Metodo para agregar un personaje a la lista de favoritos del usuario
  async addFavorite()
  {
    /* Recibimos el personaje y creamos un objeto nuevo a partir del personaje para
       no sobre cargar el storage con toda la información, solamente ponemos lo necesario*/ 
    const char = {
      id: this.character.id,
      name: this.character.name,
      description: this.character.description,
      photoUrl: this.character.thumbnail.path + '.' + this.character.thumbnail.extension
    }
    const data = await this.characterService.addFavorite(char, this.identity.uid);
    
    if (!data)
    {
      this.alertService.mostrarToast('Added to your favorites');
      this.checkFavorite();
    }
  }

  async removeFavorite()
  {
    const band = await this.characterService.RemoveFavorite(this.character.id, this.identity.uid);

    if (band)
    {
      this.alertService.mostrarToast('Removed from your favorites');
    }

    this.checkFavorite();
  }

}
