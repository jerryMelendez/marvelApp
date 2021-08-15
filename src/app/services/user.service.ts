import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';

// const { Storage } = Plugins;
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private afsAuth: AngularFireAuth
  ) { }

  async getIdentity()
  {
    const resp = await Storage.get({ key: 'identity' });
    const identity = JSON.parse(resp.value);
    return identity;
  }

  addUser()
  {
    const user = {
      id: 1,
      name: 'Jerry',
      lastname: 'Melendez'
    }
    Storage.set({ key: 'identity', value: JSON.stringify(user) });
  }

  loginGoogleUser() {
    return this.afsAuth.signInWithPopup(new firebase.default.auth.GoogleAuthProvider())
            .then(credential => this.updateUserData(credential.user) );
  }

  async updateUserData(user, band?: boolean) {
    const nombres = user.displayName.split(' ');
    const usuario: any = {};
    usuario.nombre = nombres[0];
    usuario.apellidos = '';
    usuario.email = user.email;
    usuario.foto = user.providerData[0].photoURL;
    usuario.nick = nombres[0] + '' + nombres[1].substring(0, 1) + Math.round(Math.random() * 1001);
  
    for (let i = 1; i < nombres.length; i++) {
      usuario.apellidos = ' ' + usuario.apellidos + nombres[i];
    }
  
    if (user.providerData[0].providerId === 'google.com')
    {
      usuario.auth = 'google';
    }
    if (user.providerData[0].providerId === 'facebook.com')
    {
      usuario.auth = 'facebook';
    }
  
    return usuario;
  }
}
