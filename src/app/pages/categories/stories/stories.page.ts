import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { StoriesService } from '../../../services/stories.service';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.page.html',
  styleUrls: ['./stories.page.scss'],
})
export class StoriesPage implements OnInit {

  public arrayStories: any[] = [];
  public identity: any = {};
  constructor(
    private storiesService: StoriesService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.getStories();
  }

  getStories(name = null)
  {
    this.storiesService.getStories(0, 100).subscribe(
      response => {
        if (response.code === 200)
        {
          this.alertService.stopLoading();
          this.arrayStories = response.data.results;
          console.log(this.arrayStories);
        }
      }
    );
  }

  onTypeEmitted(event)
  {
    this.alertService.showLoading();
    this.getStories(event === '' ? null : event);
  }

}
