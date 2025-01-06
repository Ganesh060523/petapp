import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { Pet } from '../../models/pet.model';
import { PetService } from '../../service/pet.service';
import { ApiResponse } from '../../models/api-response';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mypet',
  imports: [CommonModule,FormsModule],
  templateUrl: './mypet.component.html',
  styleUrl: './mypet.component.css'
})
export class MypetComponent implements OnInit {
  pets: Pet[] = [];

  constructor(private petService: PetService, private router: Router) {}

  ngOnInit(): void {
    this.listPet();
  }

  listPet(): void {
    this.petService.getAllPets().subscribe({
      next: (response: ApiResponse<Pet[]>) => {
        this.pets = response.data;
      },
      error: (err) => {
        console.error('Error fetching pets:', err);
      }
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
        }
      });
    }
  }
}