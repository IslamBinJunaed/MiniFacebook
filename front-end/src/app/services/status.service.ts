import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StatusService {
  constructor() {}

  public async fetchStatus() {
    const respose = await fetch('http://localhost:5000/status', {
      method: 'GET',
      credentials: 'include',
    });
    return await respose.json();
  }

  public async postStatus(status: { content: string }) {
    fetch('http://localhost:5000/status', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(status),
    });
  }
}
