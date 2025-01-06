export interface User {
    id: number;
    name: string;
    email: string;
    role: 'OWNER' | 'VOLUNTEER' | 'ADMIN'; // Adjust based on your requirements
    phone: string;
    address: string;
  }