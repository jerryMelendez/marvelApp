import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { NavController } from '@ionic/angular';
import { Filesystem, FilesystemDirectory } from '@capacitor/filesystem';
import { Capacitor } from '@capacitor/core';

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

    if (myuid.value !== null)
    {
      const arrayMyUid = myuid.value.split(`\"`)
  
      const users = await Storage.get({ key: 'users' });
  
      const arrayUsers: any[] = JSON.parse(users.value);
  
      const identity = arrayUsers.find(e => e.uid === arrayMyUid[1]);
  
      return identity;
    }
    else
    {
      return {};
    }
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

  updateIdentity(user): Promise<any>
  {
    const key = 'users';
    return Storage.get({ key }).then((items) => {
      let data: any[] = JSON.parse(items.value);
      if ( data )
      {
        const index = data.findIndex(e => e.uid === user.uid); // Buscar el indice cuyos uid coincidan

        if (index > -1) // Si se encontró un indice reemplazar el registro por el objeto nuevo
        {
          data[index] = user;
        }
        
        // Cargamos el array devuelta al local storage
        Storage.set({ key, value: JSON.stringify(data) });
      }
    });
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
    usuario.displayName = user.displayName;
    usuario.email = user.email;
    usuario.fotourl = user.providerData[0].photoURL;
    usuario.foto = '';
    usuario.nick = nombres[0] + '' + nombres[1].substring(0, 1) + Math.round(Math.random() * 1001);
    usuario.uid = user.uid;
  
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

  async uploadPhotos(file: any)
  {
    // const headers = new HttpHeaders().set('Authorization', token);
    // const formData = new FormData();
    // formData.append('file0', foto, foto.name);
    // return this.http.post(`${url}user/upload`, formData, {headers});
    const base64Data = await this.readAsBase64(file);

    // Escribe el archivo a la carpeta Data
    const fileName = '' + file.name + '.jpeg';
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: FilesystemDirectory.Data
    }).then( () => {

      Filesystem.getUri({
        directory: FilesystemDirectory.Data,
        path: fileName
      }).then( result => {
        let path = Capacitor.convertFileSrc(result.uri);
        console.log(path);
      },
      err => { console.log(err); });
    });
    console.log(savedFile);
    
    // Usa webPath para mostrar la nueva imagen en lugar de base64 desde la que 
    // ya está cargada en memoria
    return {
      filepath: fileName,
      // webviewPath: cameraPhoto.webPath
    };
  }

  private async readAsBase64(cameraPhoto) {
    // Obtener la foto, leer como un blob, luego convertir a formato base64
    const response = await fetch(cameraPhoto.webPath!);
   const blob = await response.blob();
  
    return await this.convertBlobToBase64(blob) as string;  
  }
  
  convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader;
    reader.onerror = reject;
    reader.onload = () => {
        resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });

  async logOut(): Promise<any>
  {
    await Storage.remove({key: 'my_uid'});
  }
  
}
