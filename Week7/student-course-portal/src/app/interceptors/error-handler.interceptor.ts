import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
    catchError(error => {
      if (error.status === 401) {
        console.warn('Unauthorized request (401) — navigating to home');
        router.navigate(['/']);
      } else if (error.status === 500) {
        console.error('Server error (500):', error.message);
        alert('Global Server Error: Please try again later.');
      }
      return throwError(() => error);
    })
  );
};
