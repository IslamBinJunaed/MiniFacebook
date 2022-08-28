import { Component, OnInit } from '@angular/core';
import { StatusService } from '../services/status.service';
import { StoryService } from '../services/story.service';

interface Status {
  email: string;
  content: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public content: string = '';
  public statusList: Array<Status> = [];
  public storySourceList: Array<string> = [];

  constructor(
    private statusService: StatusService,
    private storyService: StoryService
  ) {}

  public async handlePostSubmission() {
    await this.statusService.postStatus({ content: this.content });
    this.content = '';
  }

  public handleFileUpload(event: Event) {
    this.storyService.uploadFile(event);
  }

  async ngOnInit() {
    this.statusList = await this.statusService.fetchStatus();
    this.storySourceList = await this.storyService.fetchStory();
  }
}
