import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { UserService } from '../../service/user.service';
import { PetService } from '../../service/pet.service';
import { PetrequestService } from '../../service/petrequest.service';
import { AdoptionRequest } from '../../models/adoption-request.model'; // Importing AdoptionRequest
import { Pet } from '../../models/pet.model';
import { User } from '../../models/user.model';
import { ApiResponse } from '../../models/api-response';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserComponent } from './user/user.component';
import { PetComponent } from "./pet/pet.component";
import { RequestComponent } from "./request/request.component";
import { GraphComponent } from "./graph/graph.component";

@Component({
  selector: 'app-admin',
  imports: [CommonModule, FormsModule, RouterLink, UserComponent, PetComponent, RequestComponent, GraphComponent],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'] // Corrected to use styleUrls (plural)
})
export class AdminComponent implements OnInit {
  selectedUserId: number | null = null;
  selectedPetId: number | null = null;
  selectedRequestId: number | null = null;

  userGraphData: any;
  petGraphData: any;
  requestGraphData: any;

  constructor(
    private router: Router,
    private userService: UserService,
    private petService: PetService,
    private petRequestService: PetrequestService
  ) {}

  ngOnInit(): void {
    this.loadUserGraph();
    this.loadPetGraph();
    this.loadRequestGraph();
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  loadUserGraph() {
    this.userService.getAllUsers().subscribe((response) => {
      const users = response.data;  // Assuming data is in response.data
      const roles = users.reduce((acc: any, user) => {
        acc[user.role] = (acc[user.role] || 0) + 1;
        return acc;
      }, {});

      this.userGraphData = {
        labels: Object.keys(roles),
        datasets: [
          {
            label: 'Users by Role',
            data: Object.values(roles),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          },
        ],
      };
    });
  }

  loadPetGraph() {
    this.petService.getAllPets().subscribe((response) => {
      const pets = response.data;  // Assuming data is in response.data
      const types = pets.reduce((acc: any, pet) => {
        acc[pet.type] = (acc[pet.type] || 0) + 1;
        return acc;
      }, {});

      this.petGraphData = {
        labels: Object.keys(types),
        datasets: [
          {
            label: 'Pets by Type',
            data: Object.values(types),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
          },
        ],
      };
    });
  }

  loadRequestGraph() {
    this.petRequestService.getAllAdoptionRequests().subscribe((response) => {
      const requests = response.data;  // Assuming data is in response.data
      const statuses = requests.reduce((acc: any, request) => {
        acc[request.status] = (acc[request.status] || 0) + 1;
        return acc;
      }, {});

      this.requestGraphData = {
        labels: Object.keys(statuses),
        datasets: [
          {
            label: 'Requests by Status',
            data: Object.values(statuses),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
          },
        ],
      };
    });
  }
}