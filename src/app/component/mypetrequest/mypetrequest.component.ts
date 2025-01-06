import { Component, OnInit } from '@angular/core';
import { AdoptionRequest } from '../../models/adoption-request.model';
import { PetrequestService } from '../../service/petrequest.service';
import { ApiResponse } from '../../models/api-response';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth.service'; // Import the AuthService

@Component({
  selector: 'app-mypetrequest',
  imports: [CommonModule, FormsModule],
  templateUrl: './mypetrequest.component.html',
  styleUrl: './mypetrequest.component.css',
})
export class MypetrequestComponent implements OnInit {
  adoptionRequests: AdoptionRequest[] = [];
  ownerId: number | null = null; // Dynamic owner ID

  constructor(
    private petRequestService: PetrequestService,
    private authService: AuthService // Inject the AuthService
  ) {}

  ngOnInit(): void {
    this.ownerId = this.authService.getLoggedInUserId(); // Retrieve logged-in user's ID
    if (this.ownerId) {
      this.loadAdoptionRequests();
    } else {
      console.error('Owner ID not found. Please ensure the user is logged in.');
      alert('Error: User not logged in.');
    }
  }

  /** Load all adoption requests for the current owner's pets */
  loadAdoptionRequests(): void {
    this.petRequestService.getRequestsForOwner(this.ownerId!).subscribe({
      next: (response: ApiResponse<AdoptionRequest[]>) => {
        this.adoptionRequests = response.data;
      },
      error: (err) => {
        console.error('Failed to load adoption requests', err);
        alert('Error loading adoption requests. Please try again later.');
      },
    });
  }

  /** Accept an adoption request */
  acceptRequest(requestId: number): void {
    const requestToUpdate = this.adoptionRequests.find((req) => req.id === requestId);
    if (!requestToUpdate) {
      alert('Request not found.');
      return;
    }

    const updatedRequest: AdoptionRequest = {
      ...requestToUpdate,
      status: 'APPROVED',
    };

    this.petRequestService.updateAdoptionRequest(requestId, updatedRequest).subscribe({
      next: () => {
        alert('Request accepted successfully.');
        this.loadAdoptionRequests(); // Refresh the list
      },
      error: (err) => {
        console.error('Failed to accept request', err);
        alert('Failed to accept the request. Please try again.');
      },
    });
  }

  /** Reject an adoption request */
  rejectRequest(requestId: number): void {
    const requestToUpdate = this.adoptionRequests.find((req) => req.id === requestId);
    if (!requestToUpdate) {
      alert('Request not found.');
      return;
    }

    const updatedRequest: AdoptionRequest = {
      ...requestToUpdate,
      status: 'REJECTED',
    };

    this.petRequestService.updateAdoptionRequest(requestId, updatedRequest).subscribe({
      next: () => {
        alert('Request rejected successfully.');
        this.loadAdoptionRequests(); // Refresh the list
      },
      error: (err) => {
        console.error('Failed to reject request', err);
        alert('Failed to reject the request. Please try again.');
      },
    });
  }
}
