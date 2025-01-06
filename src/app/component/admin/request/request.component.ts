import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdoptionRequest } from '../../../models/adoption-request.model';
import { PetrequestService } from '../../../service/petrequest.service';
import { ApiResponse } from '../../../models/api-response';

@Component({
  selector: 'app-request',
  imports: [FormsModule,CommonModule],
  templateUrl: './request.component.html',
  styleUrl: './request.component.css'
})
export class RequestComponent implements OnInit {
  requests: AdoptionRequest[] = [];


  constructor(private petRequestService: PetrequestService) {}

  ngOnInit(): void {
    this.loadAllAdoptionRequests();  // Load adoption requests when the component initializes
  }

  // Load all adoption requests
  loadAllAdoptionRequests(): void {
    this.petRequestService.getAllAdoptionRequests().subscribe(
      (response: ApiResponse<AdoptionRequest[]>) => {
        if (response.statusCode) {
          this.requests = response.data;
        } else {
          console.error('Error fetching adoption requests:', response.message);
        }
      },
      (error) => {
        console.error('Error fetching adoption requests:', error);
      }
    );
  }

 
}
