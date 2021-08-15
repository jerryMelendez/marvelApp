import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { Observable } from 'rxjs';

// const { Storage } = Plugins;
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

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
}
