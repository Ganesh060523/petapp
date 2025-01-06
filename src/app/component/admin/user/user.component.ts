import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user.model';
import { UserService } from '../../../service/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiResponse } from '../../../models/api-response';

@Component({
  selector: 'app-user',
  imports: [CommonModule,FormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {
  users: User[] = [];
  

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadAllUsers();  // Load users when the component initializes
  }

  // Load all users
  loadAllUsers(): void {
    this.userService.getAllUsers().subscribe(
      (response: ApiResponse<User[]>) => {
        if (response.statusCode) {
          this.users = response.data;
        } else {
          console.error('Error fetching users:', response.message);
        }
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }
}

