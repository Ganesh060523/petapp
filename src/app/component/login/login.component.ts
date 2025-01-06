import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { LoginRequest } from '../../models/login-request.model';
import { ApiResponse } from '../../models/api-response';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from "../navbar/navbar.component";
import { Router } from '@angular/router';
import { Profile } from '../../models/profile';
import { RefreshService } from '../../refresh-service.service';


@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginRequest: LoginRequest = {
    email: 'ganesh@gmail.com',
    password: '123'
  };

  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router, private refreshService: RefreshService) {}

  onLogin() {
    this.authService.loginUser(this.loginRequest).subscribe({
      next: (response: ApiResponse<Profile>) => {
        if (response.statusCode === 200) {
       
          this.authService.setToken(response.data.token);
          this.authService.setUserData(response.data.user); // Save user details globally
          this.refreshService.triggerRefresh(); // Notify navbar to refresh
           // Trigger refresh for other components
         
          this.router.navigate(['/home']);
        } else {
          this.errorMessage = response.message;
        }
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'An error occurred. Please try again later.';
      },
    });
  }
}