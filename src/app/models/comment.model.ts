import { User } from "./user.model";

export interface Comment {
    id: number;
    content: string;
    createdDate: string; // You can use Date if you need date objects instead of strings
    petId: number;
    userId:number;

    uname:string;
    email:string;
   
  }