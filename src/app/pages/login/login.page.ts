import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public type = 'password'; // El type del input de contraseña
  public userName = '';
  public password = '';
  
  constructor() { }

  ngOnInit() {
  }

  // Evento al pulsar el ojo para ver la contraseña
  changeInputType()
  {
    console.log('chagetype');
    this.type = this.type === 'password' ? 'text' : 'password';
  }

}
