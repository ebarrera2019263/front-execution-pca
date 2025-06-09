import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
  requires2FA: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:5286/api/Auth';

  tempUsername?: string;
  tempToken?: string;

  constructor(private http: HttpClient) {}

  login(credentials: { username: string; password: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials);
  }

 verify2FA(username: string, code: string) {
  return this.http.post<{ message: string }>('http://localhost:5286/api/Auth/verify-2fa', {
    username,
    code
  });
}


  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  saveUsername(username: string): void {
    localStorage.setItem('username', username);
  }

  getUsername(): string | null {
    return localStorage.getItem('username');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.tempUsername = undefined;
    this.tempToken = undefined;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
