import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Pet } from '../../../models/pet.model';
import { PetService } from '../../../service/pet.service';
import { ApiResponse } from '../../../models/api-response';

@Component({
  selector: 'app-pet',
  imports: [CommonModule,FormsModule],
  templateUrl: './pet.component.html',
  styleUrl: './pet.component.css'
})
export class PetComponent implements OnInit {
  pets: Pet[] = [];
  

  constructor(private petService: PetService) {}

  ngOnInit(): void {
    this.loadAllPets();  // Load pets when the component initializes
  }

  // Load all pets
  loadAllPets(): void {
    this.petService.getAllPets().subscribe(
      (response: ApiResponse<Pet[]>) => {
        if (response.statusCode) {
          this.pets = response.data;
        } else {
          console.error('Error fetching pets:', response.message);
        }
      },
      (error) => {
        console.error('Error fetching pets:', error);
      }
    );
  }

 
}