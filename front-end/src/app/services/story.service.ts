import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StoryService {
  constructor() {}

  public async fetchStory() {
    const respose = await fetch('http://localhost:5000/story', {
      method: 'GET',
      credentials: 'include',
    });
    return await respose.json();
  }

  public async uploadFile(event: Event) {
    const formData = new FormData();
    // @ts-ignore
    formData.append('story', event.target.files[0]);

    fetch('http://localhost:5000/story', {
      method: 'POST',
      credentials: 'include',
      body: formData,
    }).then((_) => alert('Image Uploaded'));
  }
}
