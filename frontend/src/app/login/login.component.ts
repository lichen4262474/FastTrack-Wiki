import { Component } from '@angular/core';
import { MyServiceService } from '../my-service.service';
import * as Models from '../models/model.ts';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  credentials: Models.CredentialsDto = { username: '', password: '' };
  errorMessage: string = '';

  constructor(private myService: MyServiceService, private router: Router) {}

  // Method to handle login
  login(): void {
    this.myService.loginUser(this.credentials).subscribe(
      (user) => {
        this.myService.setUser(user);
        console.log('Login successful:', user);
        this.router.navigate(['/company']);
      },
      (error) => {
        this.errorMessage = 'Login failed. Please check your credentials.';
        console.error('Login error:', error);
      }
    );
  }
}
