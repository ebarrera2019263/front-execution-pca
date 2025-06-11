import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { UiStateService } from './ui-state.service';

export interface LoginResponse {
  isAuthenticated: boolean;
  token: string;
  username: string;
  message: string;

  mostrarNuevaFranja: boolean;
  puedeModificarCompromisos: boolean;
  permitirGuardarComoCompromiso: boolean;
  activarTemaAzulESBI: boolean;
  ocultarElementosTrascendiendo: boolean;
  usarLoginPortalGYT: boolean;
  mostrarBotonReinicio: boolean;
  requires2FA: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private uiState = inject(UiStateService);
  private apiUrl = 'http://localhost:5286/api/Auth';

  tempUsername?: string;
  tempToken?: string;

  login(credentials: { username: string; password: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        if (!response.requires2FA) {
          this.saveToken(response.token);
          this.saveUsername(response.username);
          this.uiState.setLoginState(response);
        }
      })
    );
  }

  verify2FA(username: string, code: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.apiUrl}/verify-2fa`, { username, code });
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  saveUsername(username: string): void {
    localStorage.setItem('username', username);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUsername(): string | null {
    return localStorage.getItem('username');
  }

  logout(): void {
    localStorage.clear();
    this.tempUsername = undefined;
    this.tempToken = undefined;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  resetPassword(username: string, email: string): Observable<number> {
    return this.http.post<number>(`${this.apiUrl}/reset-password`, { username, email });
  }
}
