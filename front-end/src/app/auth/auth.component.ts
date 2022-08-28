import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  public email: string = '';
  public password: string = '';

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}

  public handleAuthentication = async (authType: string) => {
    if (
      await this.authService.requestAuthentication(
        this.email,
        this.password,
        authType
      )
    ) {
      this.router.navigate(['home']);
    } else {
      alert('Something Went Wrong');
    }
  };

  ngOnInit(): void {}
}
