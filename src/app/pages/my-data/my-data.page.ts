import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { UserService } from 'src/app/services/user.service';
import { Geolocation } from '@capacitor/geolocation';
import { Platform } from '@ionic/angular';


@Component({
  selector: 'app-my-data',
  templateUrl: './my-data.page.html',
  styleUrls: ['./my-data.page.scss'],
})
export class MyDataPage implements OnInit {

  public width = (window.innerWidth) * 0.5;
  public photoUrl: string = '';
  public identity: any = {};

  selectedFile = null;
  constructor(
    private userService: UserService,
    private alertService: AlertService,
    private platform: Platform
  ) { this.getIdentity(); }

  ngOnInit() {
  }

  async getLocation() {
    // const position = await Geolocation.getCurrentPosition();
    // setTimeout(() => {
    //   this.openMapsApp(position.coords.latitude, position.coords.longitude);
    // }, 500);
    const printCurrentPosition = async () => {
      const coordinates = await Geolocation.getCurrentPosition();
    
      console.log('Current position:', coordinates);
    };
    console.log(await Geolocation.checkPermissions());
    // const coordinates = await Geolocation.getCurrentPosition();
    // console.log(coordinates);
  }

  async getIdentity()
  {
    this.identity = await this.userService.getIdentity();
    this.photoUrl = this.identity.foto !== '' ? this.identity.foto : this.identity.fotourl;
  }

  subirFoto( event: any ): void
  {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
    this.userService.uploadPhotos(this.selectedFile);
    // this.alertService.showLoading('Subiendo . . .');
    // this.userService.subirImagen(this.selectedFile).subscribe(
    //   response => {
    //     if (response.image)
    //     {
    //       this.alertService.stopLoading(true);
    //       this.usuario.foto = response.image;
    //       this.alertService.alertaInformativa('Imagen añadida correctamente');
    //     } else {
    //       this.alertService.stopLoading(true);
    //       this.alertService.alertaInformativa(response.message);
    //     }
    //   }, error => {
    //     this.alertService.stopLoading(true);
    //     this.alertService.alertaInformativa('Error: formato de imagen no soportado');
    //   }
    // );
  }

  openMapsApp(latitude, longitude) {
    if (this.platform.is('android'))
    {
      window.location.href = `https://www.google.com/maps/@${latitude},${longitude}`
    }
    else
    {
      window.open(`https://www.google.com/maps/@${latitude},${longitude}`);
    }
    
  }
}