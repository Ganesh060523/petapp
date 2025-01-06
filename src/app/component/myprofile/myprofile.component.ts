import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { AuthService } from '../../service/auth.service';
import { UserService } from '../../service/user.service';
import { User } from '../../models/user.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-myprofile',
  imports: [FormsModule,CommonModule],
  templateUrl: './myprofile.component.html',
  styleUrl: './myprofile.component.css'
})
export class MyprofileComponent implements OnInit {
  user: User | any = null; // Holds user data
  isEditing: boolean = false; // Tracks edit mode

  constructor(private authService: AuthService, private userService:UserService) {}

  ngOnInit(): void {
    // Fetch user data (mock data or service call)
    this.user = this.authService.getUserData();
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
  }

  saveProfile(): void {
    // Save updated profile data (API call or local update)
    this.userService.updateUser(this.user.id,this.user).subscribe({
      next: (response) => {
        if (response.statusCode === 200) {
           this.authService.setUserData(response.data);
        console.log('Profile updated successfully:', response);
        this.isEditing = false;
        }
      },
      error: (error) => {
        console.error('Error updating profile:', error);
      },
    });
  }
}