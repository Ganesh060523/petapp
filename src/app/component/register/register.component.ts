import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { RegisterRequest } from '../../models/register-request.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { environment } from '../../service/configuration/environment'; // Correct path for environment

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']  // Corrected here
})
export class RegisterComponent {
  registerRequest: RegisterRequest = {
    email: '',
    password: '',
    role: 'OWNER',  // Default value can be OWNER
  };

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {}

  onRegister() {
    // Use the apiUrl from the environment config to call the backend API
    const apiUrl = `${environment.apiUrl}/api/auth/register`; // Ensure correct URL with a slash
    
    this.http.post(apiUrl, this.registerRequest).pipe(
      catchError((error) => {
        console.error('Registration failed', error);
        alert('Registration failed, please try again.');
        throw error;
      })
    ).subscribe(
      (response: any) => {
        // If registration is successful, you can navigate to the login page
        console.log('Registration successful', response);
        this.router.navigate(['/home/login']);
      },
      (error) => {
        console.error('Registration error', error);
        alert('Something went wrong during registration. Please try again.');
      }
    );
  }
}
