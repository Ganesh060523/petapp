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

@Component({
  selector: 'app-admin',
  imports: [CommonModule, FormsModule, RouterLink, UserComponent, PetComponent, RequestComponent],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'] // Corrected to use styleUrls (plural)
})
export class AdminComponent implements OnInit {
  selectedUserId: number | null = null;
  selectedPetId: number | null = null;
  selectedRequestId: number | null = null;

  constructor(
    private router: Router,
    private userService: UserService,
    private petService: PetService,
    private petRequestService: PetrequestService
  ) {}

  ngOnInit(): void {}

  // Navigate to the user management page
  loadAllUsers(): void {
    this.router.navigate(['admin/user']);
  }

  // Navigate to the pet management page
  loadAllPets(): void {
    this.router.navigate(['admin/pet']);
  }

  // Navigate to the adoption requests page
  loadAllAdoptionRequests(): void {
    this.router.navigate(['admin/request']);
  }
}