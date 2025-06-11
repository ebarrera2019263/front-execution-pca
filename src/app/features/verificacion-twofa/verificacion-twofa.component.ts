import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-verificacion-twofa',
  imports: [CommonModule, ReactiveFormsModule, MatSnackBarModule],
  templateUrl: './verificacion-twofa.component.html',
  styleUrls: ['./verificacion-twofa.component.scss']
})
export class VerificacionTwofaComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private snack = inject(MatSnackBar);

  form: FormGroup = this.fb.group({
    code: ['', Validators.required]
  });

  isLoading = false;

  onSubmit(): void {
    if (this.form.valid) {
      this.isLoading = true;

      const username = this.authService.tempUsername;
      const token = this.authService.tempToken;
      const code = this.form.value.code;

      if (!username || !token) {
        this.snack.open('Sesión inválida. Inicie sesión de nuevo.', 'Cerrar', { duration: 3000 });
        this.router.navigate(['/auth/login']);
        return;
      }

      // Guardamos el token temporalmente
      this.authService.saveToken(token);
      this.authService.saveUsername(username);

      this.authService.verify2FA(username, code).subscribe({
        next: () => {
          this.snack.open('Autenticación exitosa.', 'Cerrar', { duration: 2000 });
          this.router.navigate(['/welcome']);
        },
        error: (err) => {
          const errorMsg = err?.error?.message || 'Código inválido.';
          this.snack.open('Error de verificación: ' + errorMsg, 'Cerrar', { duration: 3000 });
          this.isLoading = false;
        }
      });
    }
  }
}
