import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../auth.service';


export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const token = localStorage.getItem("authToken");
  console.log(token)
  const router = inject(Router);
  const authService = inject(AuthService); // Inject AuthService

  // Check if the request is for login or register
  if (req.url.includes('/login') || req.url.includes('/register') ||   token==null) {
    // Pass the original request for login/register without modifying headers
    return next(req);
  }


  const clonedRequest = req.clone({

    setHeaders: {
      Authorization: "Bearer " + token
    }
  });

  // Pass the cloned request to the next handler
  return next(clonedRequest).pipe(
    catchError(error => {
      if (error.status === 403 || error.status === 401 ) {
        authService.logout();
        console.log('Your session has expired. Please log in again.');
      }
      return throwError (()=>new Error("Invalid token send")); // Propagate the error further
    })
  );
};
