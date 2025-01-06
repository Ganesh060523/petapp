import { Component, OnInit } from '@angular/core';
import { AdoptionRequest } from '../../models/adoption-request.model';
import { Pet } from '../../models/pet.model';
import { PetrequestService } from '../../service/petrequest.service';
import { PetService } from '../../service/pet.service';
import { ApiResponse } from '../../models/api-response';
import { AuthService } from '../../service/auth.service'; // Import AuthService
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-requestedpet',
  imports: [CommonModule, FormsModule],
  templateUrl: './requestedpet.component.html',
  styleUrl: './requestedpet.component.css'
})
export class RequestedpetComponent implements OnInit {
  adoptionRequests: AdoptionRequest[] = [];
  requestedPets: { request: AdoptionRequest; pet: Pet }[] = [];
  currentUserId: number | null = null;

  constructor(
    private petRequestService: PetrequestService,
    private petService: PetService,
    private authService: AuthService // Inject AuthService
  ) {}

  ngOnInit(): void {
    this.initializeCurrentUserId();
    this.loadRequestedPets();
  }

  /** Initialize the current user's ID */
  initializeCurrentUserId(): void {
    this.currentUserId = this.authService.getLoggedInUserId();
  }

  /** Load adoption requests and pet details for the current user */
  loadRequestedPets(): void {
    if (this.currentUserId === null) {
      console.error('User not logged in.');
      alert('Please log in to view your requests.');
      return;
    }

    this.petRequestService.getAllAdoptionRequests().subscribe({
      next: (response: ApiResponse<AdoptionRequest[]>) => {
        this.adoptionRequests = response.data.filter(
          (request) => request.userId === this.currentUserId
        );

        // Fetch pet details for each request
        this.adoptionRequests.forEach((request) => {
          this.petService.getPetById(request.petId).subscribe({
            next: (petResponse: ApiResponse<Pet>) => {
              this.requestedPets.push({ request, pet: petResponse.data });
            },
            error: (err) => {
              console.error('Failed to fetch pet details', err);
            }
          });
        });
      },
      error: (err) => {
        console.error('Failed to load adoption requests', err);
        alert('Error loading your requests. Please try again later.');
      }
    });
  }
}
