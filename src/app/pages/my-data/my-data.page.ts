import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-my-data',
  templateUrl: './my-data.page.html',
  styleUrls: ['./my-data.page.scss'],
})
export class MyDataPage implements OnInit {

  public width = (window.innerWidth) * 0.5;
  private identity;
  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this.getIdentity();
    }, 1000);
  }

  async getIdentity()
  {
    this.identity = await this.userService.getIdentity();
    console.log(this.identity);
  }
}
