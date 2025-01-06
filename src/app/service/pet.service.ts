import { Injectable } from '@angular/core';
import { environment } from './configuration/environment';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../models/api-response';
import { Observable } from 'rxjs';
import { Pet } from '../models/pet.model';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  private apiUrl = `${environment.apiUrl}/api/pets`; // Adjust this based on your API URL

  constructor(private http: HttpClient) {}

  // Create a new pet
  savePet(pet: Pet, images: File[]): Observable<ApiResponse<Pet>> {
    const formData = new FormData();
    formData.append('pet', JSON.stringify(pet));
    images.forEach((image) => formData.append('images', image));

    return this.http.post<ApiResponse<Pet>>(`${this.apiUrl}`, formData);
  }

  // Update an existing pet
  updatePet(petId: number, pet: Pet, images: File[]): Observable<ApiResponse<Pet>> {
    const formData = new FormData();
    formData.append('pet', JSON.stringify(pet));
    if (images.length > 0) {
      images.forEach((image) => formData.append('images', image));
    }

    return this.http.put<ApiResponse<Pet>>(`${this.apiUrl}/${petId}`, formData);
  }

  // Get pet by ID
  getPetById(petId: number): Observable<ApiResponse<Pet>> {
    return this.http.get<ApiResponse<Pet>>(`${this.apiUrl}/${petId}`);
  }

  // Get all pets
  getAllPets(): Observable<ApiResponse<Pet[]>> {
    return this.http.get<ApiResponse<Pet[]>>(`${this.apiUrl}`);
  }

  // Delete pet by ID
  deletePet(petId: number): Observable<ApiResponse<string>> {
    return this.http.delete<ApiResponse<string>>(`${this.apiUrl}/${petId}`);
  }
}