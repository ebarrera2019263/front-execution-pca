import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { QRCodeComponent } from 'angularx-qrcode'; // <-- CORRECTO ahora

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, QRCodeComponent], // <-- usamos el componente
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent {
  qrCodeUri: string | null = null;
  secretKey: string | null = null;
  is2FAEnabled = false;
  verificationForm: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  isLoading = false;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.verificationForm = this.fb.group({
      code: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
    });
  }

  activar2FA(): void {
    this.errorMessage = null;
    this.successMessage = null;
    this.isLoading = true;

    const username = this.authService.getUsername();
    if (!username) {
      this.errorMessage = 'Usuario no autenticado.';
      this.isLoading = false;
      return;
    }

    this.http.post<{ secretKey: string; qrCodeUri: string }>(
      'http://localhost:5286/api/Auth/enable-2fa',
      { username }
    ).subscribe({
      next: res => {
        this.secretKey = res.secretKey;
        this.qrCodeUri = res.qrCodeUri;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Error al activar 2FA.';
        this.isLoading = false;
      }
    });
  }

  verificarCodigo(): void {
    if (this.verificationForm.invalid) return;

    this.errorMessage = null;
    this.successMessage = null;

    const username = this.authService.getUsername();
    const code = this.verificationForm.value.code;

    this.isLoading = true;

    this.authService.verify2FA(username!, code).subscribe({
      next: res => {
        this.successMessage = res.message;
        this.is2FAEnabled = true;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Código inválido o expirado.';
        this.isLoading = false;
      }
    });
  }
}
