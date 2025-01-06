import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Pet } from '../../models/pet.model';
import { PetService } from '../../service/pet.service';
import { ApiResponse } from '../../models/api-response';
import { environment } from '../../service/configuration/environment';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-pet-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './pet-list.component.html',
  styleUrl: './pet-list.component.css'
})
export class PetListComponent  implements OnInit {
  pets: Pet[] = [];
  apiURL = `${environment.apiUrl}`
  

  constructor(private petService: PetService, private userService:UserService,private router: Router) {}

  ngOnInit(): void {
    // Fetch all pets on component initialization
    this.petService.getAllPets().subscribe(
      (response: ApiResponse<Pet[]>) => {
        if (response.statusCode === 200) {
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


  getOwnerName(id:number)
  {
      this.userService.getUserById(id)
  }


  navigateToPetDetails(id: number): void {
    this.router.navigate(['/home/pet-details', id]); // Dynamically pass the pet ID
  }


}

