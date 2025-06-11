import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = authService.getToken();

  // 🚨 Permitir verificacion-2fa sin token
  if (state.url === '/verificacion-2fa') {
    return true;
  }

  if (token) {
    return true;
  } else {
    router.navigate(['/auth/login']);
    return false;
  }
};

