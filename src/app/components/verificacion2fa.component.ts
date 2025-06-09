import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-verificacion-2fa',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './verificacion2fa.component.html',
  styleUrls: ['./verificacion2fa.component.scss']
})
export class Verificacion2faComponent {
  form: FormGroup;
  isLoading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      code: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.form.valid && this.authService.tempUsername) {
      this.isLoading = true;
      this.error = null;

      const code = this.form.value.code;

      this.authService.verify2FA(this.authService.tempUsername, code).subscribe({
        next: () => {
          this.authService.saveToken(this.authService.tempToken!);
          this.authService.saveUsername(this.authService.tempUsername!);

          this.authService.tempUsername = undefined;
          this.authService.tempToken = undefined;

          this.router.navigate(['/welcome']);
          this.isLoading = false;
        },
        error: () => {
          this.error = 'Código inválido o expirado.';
          this.isLoading = false;
        }
      });
    }
  }
}
