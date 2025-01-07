import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Pet } from '../../models/pet.model';
import { PetService } from '../../service/pet.service';
import { ApiResponse } from '../../models/api-response';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-mypet',
  imports: [CommonModule, FormsModule],
  templateUrl: './mypet.component.html',
  styleUrl: './mypet.component.css',
})
export class MypetComponent implements OnInit {
  pets: Pet[] = [];
  currentUserId!: number; // Replace with actual logic to fetch logged-in user's ID.

  constructor(private petService: PetService, private router: Router,private authService:AuthService) {}

  ngOnInit(): void {
    this.setCurrentUserId();
    this.listPet();
  }
  setCurrentUserId(): void {
    // Example: Get user details from the auth service
    const user = this.authService.getCurrentUser(); // Fetch logged-in user
    if (user && user.id) {
      this.currentUserId = user.id;
    } else {
      console.error('No logged-in user found!');
    }
  }

  listPet(): void {
    this.petService.getAllPets().subscribe({
      next: (response: ApiResponse<Pet[]>) => {
        // Filter pets by the current user's ID
        this.pets = response.data.filter((pet) => pet.owner.id === this.currentUserId);
      },
      error: (err) => {
        console.error('Error fetching pets:', err);
      },
    });
  }

  editPet(petId: number): void {
    this.router.navigate(['home/editpet', petId]);
  }

  deletePet(petId: number): void {
    if (confirm('Are you sure you want to delete this pet?')) {
      this.petService.deletePet(petId).subscribe({
        next: () => {
          console.log(`Pet with ID ${petId} deleted successfully.`);
          this.listPet();
        },
        error: (err) => {
          console.error(`Error deleting pet with ID ${petId}:`, err);
        },
      });
    }
  }
}
