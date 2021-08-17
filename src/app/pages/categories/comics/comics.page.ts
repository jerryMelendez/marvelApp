import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { UserService } from 'src/app/services/user.service';
import { ComicService } from '../../../services/comic.service';

@Component({
  selector: 'app-comics',
  templateUrl: './comics.page.html',
  styleUrls: ['./comics.page.scss'],
})
export class ComicsPage implements OnInit {

  public arrayComics: any[] = [];
  public identity: any = {};
  public pageTitle: string = 'Comics';
  public bandFavoritePage: boolean = false; // Bandera que indicará si se están viendo los comics favoritos o todos los demás
  public txtSearch: string = '';

  constructor(
    private comicService: ComicService,
    private alertService: AlertService,
    private userService: UserService
  ) {}

  async ngOnInit() {
    this.identity = await this.userService.getIdentity();

    // Obtenemos el parametro favorites en la ruta para saber si el usuario quiere ver sus favoritos o todos los comics
    const band = this.getParameterByName('favorites');
    if (band === 'true') // Si quiere ver los favoritos se cargarán de storage
    {
      this.bandFavoritePage = true;
      this.getFavoriteComics();
      this.pageTitle = 'Favorite Comics';
    }
    else // Si quiere verlos todos se cargarán del api de marvel
    {
      this.getComics();
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

  // Obtiene los comics del api
  getComics(title: string = null)
  {
    this.comicService.getComics(0, 100, title).subscribe(
      response => {
        if (response.code === 200)
        {
          this.alertService.stopLoading();
          this.arrayComics = response.data.results;
          console.log(this.arrayComics);
        }
      },
      error => {
        console.log(error);
      }
    )
  }

  // Obtiene los comics favoritos del storage
  async getFavoriteComics()
  {
    // this.arrayComics = await this.comicService.getFavoriteCharacters(this.identity.uid);
  }

  // Recibe del componente panel-search el texto de busqueta y hace la consulta al api
  onTypeEmitted(event)
  {
    if (this.bandFavoritePage)
    {
      this.txtSearch = event;
    }
    else
    {
      this.alertService.showLoading();
      this.getComics(event !== '' ? event : null);
    }
  }

  onTypeEmittedComicPanel(event)
  {
    if (this.bandFavoritePage)
    {
      this.getFavoriteComics();
    }
  }

}
