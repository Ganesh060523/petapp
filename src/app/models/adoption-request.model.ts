export interface AdoptionRequest {
    id: number;
    requestDate: string; // You can use Date if you need date objects instead of strings
    status: 'PENDING' | 'APPROVED' | 'REJECTED';
    remarks: string;
    petId: number;
    userId: number; 
  }