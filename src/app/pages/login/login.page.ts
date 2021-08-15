import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public type = 'password'; // El type del input de contraseña
  public userName = '';
  public password = '';
  
  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
  }

  // Evento al pulsar el ojo para ver la contraseña
  changeInputType()
  {
    console.log('chagetype');
    this.type = this.type === 'password' ? 'text' : 'password';
  }

  loginGoogle()
  {
    this.userService.loginGoogleUser()
    .then((user: any) => {
      // this.alertService.showLoading('Comprobando datos....');
      // this.consultarCredenciales(user);
      console.log(user);
    }).catch((err) => {

    });
  }
}
