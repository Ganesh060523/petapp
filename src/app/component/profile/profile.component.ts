import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
   username: any;
    constructor(private router: Router,private authService: AuthService) {
      
    }
  ngOnInit(): void {
    // Get current user's name from the AuthService
    this.username = this.authService.getCurrentUser().name;
  }
  goToProfile() {
    this.router.navigate(['home/myprofile']);
  }
}
