import { Injectable } from '@angular/core';
import { environment } from './configuration/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response';
import { AdoptionRequest } from '../models/adoption-request.model';

@Injectable({
  providedIn: 'root'
})
export class PetrequestService {
  private baseUrl = `${environment.apiUrl}/api/adoption-requests`; // Update the base URL as per your API endpoint

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  /** Create a new adoption request */
  createAdoptionRequest(dto: AdoptionRequest): Observable<ApiResponse<AdoptionRequest>> {
    return this.http.post<ApiResponse<AdoptionRequest>>(
      `${this.baseUrl}`,
      dto
    );
  }

  /** Get all adoption requests */
  getAllAdoptionRequests(): Observable<ApiResponse<AdoptionRequest[]>> {
    return this.http.get<ApiResponse<AdoptionRequest[]>>(
      `${this.baseUrl}`
    );
  }

  /** Get adoption request by ID */
  getAdoptionRequestById(id: number): Observable<ApiResponse<AdoptionRequest>> {
    return this.http.get<ApiResponse<AdoptionRequest>>(
      `${this.baseUrl}/${id}`
    );
  }

  /** Update an adoption request */
  updateAdoptionRequest(
    id: number,
    dto: AdoptionRequest
  ): Observable<ApiResponse<AdoptionRequest>> {
    return this.http.put<ApiResponse<AdoptionRequest>>(
      `${this.baseUrl}/${id}`,
      dto,
      this.httpOptions
    );
  }

  /** Delete an adoption request by ID */
  deleteAdoptionRequest(id: number): Observable<ApiResponse<string>> {
    return this.http.delete<ApiResponse<string>>(
      `${this.baseUrl}/delete/${id}`
    );
  }

  /** Get all adoption requests for pets owned by a specific owner */
  getRequestsForOwner(ownerId: number): Observable<ApiResponse<AdoptionRequest[]>> {
    return this.http.get<ApiResponse<AdoptionRequest[]>>(
      `${this.baseUrl}/by-owner/${ownerId}`
    );
  }
  
}
