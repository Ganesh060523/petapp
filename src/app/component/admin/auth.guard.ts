import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService); // Inject the AuthService
  const router = inject(Router); // Inject the Router for navigation

  if (authService.isAdmin()) {
    return true; // Grant access if the user is an admin
  } else {
    router.navigate(['/home']); // Redirect to forbidden page
    return false; // Deny access
  }
};
