import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './configuration/environment';
import { ApiResponse } from '../models/api-response';
import { Comment } from '../models/comment.model'; // Your current Comment interface

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = `${environment.apiUrl}/api/comments`;

  constructor(private http: HttpClient) {}

  /**
   * Create a new comment
   */
  createComment(comment: Comment): Observable<ApiResponse<Comment>> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<ApiResponse<Comment>>(this.apiUrl, comment, { headers });
  }

  /**
   * Get all comments
   */
  getAllComments(): Observable<ApiResponse<Comment[]>> {
    return this.http.get<ApiResponse<Comment[]>>(this.apiUrl);
  }

  /**
   * Get a comment by ID
   */
  getCommentById(id: number): Observable<ApiResponse<Comment>> {
    return this.http.get<ApiResponse<Comment>>(`${this.apiUrl}/${id}`);
  }

  /**
   * Update a comment by ID
   */
  updateComment(id: number, comment: Comment): Observable<ApiResponse<Comment>> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<ApiResponse<Comment>>(`${this.apiUrl}/${id}`, comment, { headers });
  }

  /**
   * Delete a comment by ID
   */
  deleteComment(id: number): Observable<ApiResponse<string>> {
    return this.http.delete<ApiResponse<string>>(`${this.apiUrl}/${id}`);
  }

  /**
   * Get comments for a specific pet by pet ID
   */
  getCommentsByPetId(petId: number): Observable<ApiResponse<Comment[]>> {
    return this.http.get<ApiResponse<Comment[]>>(`${this.apiUrl}/by-pet/${petId}`);
  }

  /**
   * Get comments by user ID
   */
  getCommentsByUserId(userId: number): Observable<ApiResponse<Comment[]>> {
    return this.http.get<ApiResponse<Comment[]>>(`${this.apiUrl}/user/${userId}`);
  }
}
