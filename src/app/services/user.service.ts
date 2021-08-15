import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { NavController } from '@ionic/angular';

// const { Storage } = Plugins;
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private afsAuth: AngularFireAuth,
    private navCtrl: NavController
  ) { }

  async getIdentity()
  {
    const myuid = await Storage.get({key: 'my_uid'});

    const arrayMyUid = myuid.value.split(`\"`)

    const users = await Storage.get({ key: 'users' });

    const arrayUsers: any[] = JSON.parse(users.value);

    const identity = arrayUsers.find(e => e.uid === arrayMyUid[1]);

    return identity;
  }

  setIdentity(user)
  {
    // Creamos un array en el local storage de todos los usuarios que se han registrado en el dipositivo
    const key = 'users';
    // Consultar si existe el objeto de users en el storage
    Storage.get({ key }).then((items) => {
      let data: any[] = JSON.parse(items.value); // Obtener la respuesta del JSON y guardarla en una variable de tipo objeto
      // Verificar si existe un objeto guardado
      if ( data )
      {
        data.push(user);
        // filtramos el array para que no hallan usuarios repetidos
        const hash = {};
        data = data.filter(current => {
          const exists = !hash[current.uid];
          hash[current.uid] = true;
          return exists;
        });
        // Cargamos el array devuelta al local storage
        Storage.set({ key, value: JSON.stringify(data) });
      }
      else // Si no hay algun registro guardado Asignar el primero
      {
        Storage.set({ key, value: JSON.stringify([user]) });
      }
    });

    // Cargamos tambien el uid de mi usuario actual, para poder acceder a mi usuario en especifico alojado en el array de usuarios
    Storage.set({key: 'my_uid', value: JSON.stringify(user.uid)});
  }

  loginGoogleUser() {
    return this.afsAuth.signInWithPopup(new firebase.default.auth.GoogleAuthProvider())
            .then(credential => this.updateUserData(credential.user) );
  }

  loginFacebookUser() {
    return this.afsAuth.signInWithPopup(new firebase.default.auth.FacebookAuthProvider())
          .then(credential => this.updateUserData(credential.user) );
  }

  async updateUserData(user, band?: boolean) {
    console.log(user);
    const nombres = user.displayName.split(' ');
    const usuario: any = {};
    usuario.nombre = nombres[0];
    usuario.apellidos = '';
    usuario.email = user.email;
    usuario.fotourl = user.providerData[0].photoURL;
    usuario.foto = '';
    usuario.nick = nombres[0] + '' + nombres[1].substring(0, 1) + Math.round(Math.random() * 1001);
    usuario.uid = user.uid;
  
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

  async validToken(bandLogin = false): Promise<boolean>
  {
    // El bandLogin es para revertir los retornos del guard

    // Obtenemos el uid del local storage
    const uid = await Storage.get({ key: 'my_uid' });

    // Si no existe un registro de id
    if (uid.value === null)
    {
      // Si se carga una pagina que no es el login se manda a esta pagina
      if (bandLogin === false)
      {
        this.navCtrl.navigateRoot('/login');
        return Promise.resolve(false);
      }
      else // Si se carga el login permanecer ahi
      {
        return new Promise<boolean>(async resolve => {
          resolve( true ); 
       });
      }
    }
    else // si existe un registro de id
    {
      // Si no se carga desde el login permanecer ahi
      if (bandLogin === false)
      {
        return new Promise<boolean>(async resolve => {
          resolve( true ); 
       });
      }
      else // Si se carga en el login se manda al home
      {
        this.navCtrl.navigateRoot('/home');
        return Promise.resolve(false);
      }
    }
  }
}
