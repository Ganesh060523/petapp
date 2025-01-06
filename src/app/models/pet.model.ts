import { Comment } from "./comment.model";
import { User } from "./user.model";

export interface Pet {
    id: number;
    name: string;
    type: string; // e.g., Dog, Cat
    breed: string;
    age: number;
    gender: string;
    description: string;
    status: 'AVAILABLE' | 'ADOPTED'; // Adjust based on your requirements
    imageUrls: string[];
    owner: User;
    comments: Comment[];
  }