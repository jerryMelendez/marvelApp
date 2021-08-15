import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { MenuController } from '@ionic/angular'; 
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  // public appPages = [
  //   { title: 'Home', url: '/home', icon: 'mail' },
  //   { title: 'Characters', url: '/characters', icon: 'paper-plane' },
  //   { title: 'Favorites', url: '/folder/Favorites', icon: 'heart' },
  //   { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
  //   { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
  //   { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  // ];
  public identity: any = {};

  constructor(
    private navCtrl: NavController,
    private menu: MenuController,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.getIdentity();
  }

  editMyData()
  {
    this.navCtrl.navigateForward('/my-data');
    this.menu.close();
  }

  async getIdentity()
  {
    this.identity = await this.userService.getIdentity();
  }

}
