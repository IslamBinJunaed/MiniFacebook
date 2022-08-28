import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'facebook-demo';

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}

  async ngOnInit() {
    if (await this.authService.checkAuthentication()) {
      this.router.navigate(['home']);
    } else {
      this.router.navigate(['auth']);
    }
  }
}
