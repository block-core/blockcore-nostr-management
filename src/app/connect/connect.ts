import { ChangeDetectorRef, NgZone } from '@angular/core';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication';

@Component({
  selector: 'app-connect',
  templateUrl: './connect.html',
  styleUrls: ['./connect.css'],
})
export class ConnectComponent {
  constructor(
    private authService: AuthenticationService, 
    private router: Router) {}

  async connect() {
    const userInfo = await this.authService.login();

    if (userInfo.authenticated()) {
      this.router.navigateByUrl('/');
    }
  }
}
