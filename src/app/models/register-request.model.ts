export interface RegisterRequest {
    email: string;
    password: string;
    role: 'OWNER' | 'VOLUNTEER' | 'ADMIN'; // Adjust role based on your application logic
  }