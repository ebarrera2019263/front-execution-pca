import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-recuperacion-password',
  imports: [CommonModule, ReactiveFormsModule, MatSnackBarModule],
  templateUrl: './recuperacion-password.component.html',
  styleUrls: ['./recuperacion-password.component.scss']
})
export class RecuperacionPasswordComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private snack = inject(MatSnackBar);
  private router = inject(Router);

  form: FormGroup = this.fb.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]]
  });

  isLoading = false;

  onSubmit(): void {
    if (this.form.valid) {
      this.isLoading = true;
      const { username, email } = this.form.value;

      this.authService.resetPassword(username, email).subscribe({
        next: (result) => {
          switch (result) {
            case 1:
              this.snack.open('Contraseña reiniciada. Revisa tu correo.', 'Cerrar', { duration: 3000 });
              this.router.navigate(['/auth/login']);
              break;
            case 0:
              this.snack.open('Usuario o correo electrónico incorrectos.', 'Cerrar', { duration: 3000 });
              break;
            case 2:
              this.snack.open('Usuario inactivo.', 'Cerrar', { duration: 3000 });
              break;
            default:
              this.snack.open('Error inesperado. Código: ' + result, 'Cerrar', { duration: 3000 });
          }
          this.isLoading = false;
        },
        error: () => {
          this.snack.open('Error de conexión con el servidor.', 'Cerrar', { duration: 3000 });
          this.isLoading = false;
        }
      });
    }
  }
}
