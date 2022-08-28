import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor() {}

  public async checkAuthentication() {
    const response = await fetch('http://localhost:5000', {
      method: 'GET',
      credentials: 'include',
    });

    const { isAuthenticated } = await response.json();
    return isAuthenticated;
  }

  public async requestAuthentication(
    email: string,
    password: string,
    type: string
  ) {
    const endpoint = 'http://localhost:5000/' + type;

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const { isAuthenticated } = await response.json();
    return isAuthenticated;
  }
}
