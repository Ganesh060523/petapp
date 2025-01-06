import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response';
import { HttpClient } from '@angular/common/http';
import { RegisterRequest } from '../models/register-request.model';
import { LoginRequest } from '../models/login-request.model';
import { Profile } from '../models/profile';
import { Router } from '@angular/router';
import { environment } from './configuration/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  private authUrl = `${environment.apiUrl}/api/auth`;
  private authTokenKey = 'authToken';
  private userDataKey = 'userData';

  constructor(private http: HttpClient, private router: Router) {}

  /**
   * Register a new user
   * @param registerRequest - The registration details
   * @returns Observable of API response
   */
  registerUser(registerRequest: RegisterRequest): Observable<ApiResponse<string>> {
    return this.http.post<ApiResponse<string>>(`${this.authUrl}/register`, registerRequest);
  }

  /**
   * Authenticate user and return profile data
   * @param loginRequest - The login details
   * @returns Observable of API response with user profile
   */
  loginUser(loginRequest: LoginRequest): Observable<ApiResponse<Profile>> {
    return this.http.post<ApiResponse<Profile>>(`${this.authUrl}/login`, loginRequest);
  }

  /**
   * Logout the user by clearing authentication data
   */
  logout(): void {
    this.clearAuth();
    this.router.navigate(['/']);
  }

  /**
   * Get stored authentication token
   * @returns Authentication token or null
   */
  getToken(): string | null {
    return localStorage.getItem(this.authTokenKey);
  }

  /**
   * Save authentication token
   * @param token - The authentication token
   */
  setToken(token: string): void {
    localStorage.setItem(this.authTokenKey, token);
  }

  /**
   * Get stored user data
   * @returns Parsed user data or null
   */
  getUserData(): any {
    return JSON.parse(localStorage.getItem(this.userDataKey) || 'null');
  }

  /**
   * Save user data to local storage
   * @param data - User data to store
   */
  setUserData(data: any): void {
    localStorage.setItem(this.userDataKey, JSON.stringify(data));
  }

  /**
   * Clear all authentication-related data
   */
  clearAuth(): void {
    localStorage.removeItem(this.authTokenKey);
    localStorage.removeItem(this.userDataKey);
  }

  /**
   * Check if the user is logged in
   * @returns True if logged in, false otherwise
   */
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  /**
   * Retrieve the logged-in user's ID
   * @returns User ID or null
   */
  getLoggedInUserId(): number | null {
    const userData = this.getUserData();
    return userData?.id || null;
  }

  /**
   * Get the current user from local storage
   * @returns The current user's data or null
   */
  getCurrentUser() {
    return this.getUserData();  // Fetching the user data from local storage
  }

  isAdmin(): boolean {
    const userData = this.getUserData(); // Get stored user data
    return userData?.role === 'ADMIN'; // Check if the role is 'admin'
  }
}
