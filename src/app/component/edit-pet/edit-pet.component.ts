import { Component, OnInit } from '@angular/core';
import { Pet } from '../../models/pet.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PetService } from '../../service/pet.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiResponse } from '../../models/api-response';

@Component({
  selector: 'app-edit-pet',
  imports: [FormsModule, CommonModule],
  templateUrl: './edit-pet.component.html',
  styleUrls: ['./edit-pet.component.css'] // Corrected typo
})
export class EditPetComponent implements OnInit {
  pet: Pet = {} as Pet;
  images: File[] = []; // Array to hold selected images

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private petService: PetService
  ) {}

  ngOnInit(): void {
    const petId = +this.route.snapshot.paramMap.get('id')!;
    this.getPetDetails(petId);
  }

  getPetDetails(petId: number): void {
    this.petService.getPetById(petId).subscribe({
      next: (response: ApiResponse<Pet>) => {
        this.pet = response.data;
      },
      error: (err) => {
        console.error('Error fetching pet details:', err);
      }
    });
  }

  // Handles file input change and stores selected images
  onFileChange(event: any): void {
    this.images = Array.from(event.target.files); // Convert FileList to an array
  }

  savePet(): void {
    const petId = this.pet.id; // Ensure `id` exists in the `pet` object
    this.petService.updatePet(petId, this.pet, this.images).subscribe({
      next: () => {
        alert('Pet updated successfully.');
        this.router.navigate(['home/mypet']);
      },
      error: (err) => {
        console.error('Error updating pet:', err);
      }
    });
  }
}
