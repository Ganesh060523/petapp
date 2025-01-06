import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PetService } from '../../service/pet.service';
import { Pet } from '../../models/pet.model';
import { ApiResponse } from '../../models/api-response';
import { AuthService } from '../../service/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-postpet',
  imports: [ReactiveFormsModule],
  templateUrl: './postpet.component.html',
  styleUrl: './postpet.component.css'
})
export class PostpetComponent {
  petForm: FormGroup;
  selectedImages: File[] = [];
  user: User | any = null; // Holds user data

  constructor(private fb: FormBuilder, private petService: PetService, private authService:AuthService) {
    this.petForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      breed: ['', Validators.required],
      age: [0, [Validators.required, Validators.min(0)]],
      gender: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required],
      imageFile: ['', Validators.required]
    });
  }


  
  ngOnInit(): void {
    
    // Fetch user data (mock data or service call)
    this.user = this.authService.getUserData();
  }





  onFileChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files) {
      this.selectedImages = Array.from(target.files);
    }
  }

  onSubmit(): void {
    if (this.petForm.valid) {
      const pet: Pet = {
        id: 0, // Default ID, assuming backend generates it
        name: this.petForm.value.name,
        type: this.petForm.value.type,
        breed: this.petForm.value.breed,
        age: this.petForm.value.age,
        gender: this.petForm.value.gender,
        description: this.petForm.value.description,
        status: this.petForm.value.status,
        imageUrls: [], // Will be handled by backend
        owner: this.user, // Replace with actual owner ID logic
       comments:[]
      };

      this.petService.savePet(pet, this.selectedImages).subscribe({
        next: (response: ApiResponse<Pet>) => {
          alert('Pet added successfully!');
          this.petForm.reset();
        },
        error: (err) => {
          console.error(err);
          alert('An error occurred while adding the pet.');
        }
      });
    } else {
      alert('Please fill in all required fields.');
    }
  }
}
