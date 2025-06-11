import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { UiStateService } from '../../services/ui-state.service';
import { LoginIntentosService } from '../../services/login-intentos.service';
import { ToastService } from '../../services/toast.service'; // 👈 Importamos el nuevo servicio

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private uiState = inject(UiStateService);
  private intentosService = inject(LoginIntentosService);
  private toast = inject(ToastService); // 👈 inyectamos el toast

  form: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    remember: [false]
  });

  showPassword = false;
  isLoading = false;
  language: 'es' | 'en' = 'es';

  get t() {
    return this.translations[this.language];
  }

  translations = {
    es: {
      username: 'Usuario',
      password: 'Contraseña',
      remember: 'Recordar sesión',
      login: 'Iniciar',
      forgot: '¿Olvidó su contraseña?',
      toggleLang: 'Traducir EN/ES',
      slogan: 'Creando una cultura de alto desempeño'
    },
    en: {
      username: 'Username',
      password: 'Password',
      remember: 'Remember me',
      login: 'Login',
      forgot: 'Forgot your password?',
      toggleLang: 'Translate ES/EN',
      slogan: 'Creating a high-performance culture'
    }
  };

  ngOnInit(): void {
    const savedUsername = localStorage.getItem('rememberUsername');
    const savedLang = localStorage.getItem('language');

    if (savedUsername) {
      this.form.patchValue({ username: savedUsername, remember: true });
    }
    if (savedLang === 'en' || savedLang === 'es') {
      this.language = savedLang;
    }
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  toggleLanguage(): void {
    this.language = this.language === 'es' ? 'en' : 'es';
    localStorage.setItem('language', this.language);
  }

  onLogin(): void {
    if (this.form.valid) {
      this.isLoading = true;
      const { username, password, remember } = this.form.value;

      if (remember) {
        localStorage.setItem('rememberUsername', username);
      } else {
        localStorage.removeItem('rememberUsername');
      }

      this.authService.login({ username, password }).subscribe({
        next: (response) => {
          this.intentosService.resetearIntentos();

          if (response.requires2FA) {
            this.authService.tempUsername = response.username;
            this.authService.tempToken = response.token;
            this.router.navigate(['/verificacion-2fa']);
          } else {
            this.router.navigate(['/welcome']);
          }
          this.isLoading = false;
        },
        error: (err) => {
          this.intentosService.registrarIntentoFallido();

          if (this.intentosService.estaBloqueado) {
            this.toast.error('Usuario bloqueado por exceso de intentos.');
          } else if (this.intentosService.mostrarAdvertenciaCorreo) {
            this.toast.warning('Advertencia: Se enviará un correo si continúa fallando.');
          } else {
            const errorMsg = err?.error?.message ?? 'Contraseña incorrecta.';
            this.toast.error('Error al iniciar sesión: ' + errorMsg);
          }

          this.isLoading = false;
        }
      });
    }
  }

  // Visual flags
  get mostrarNuevaFranja() { return this.uiState.mostrarNuevaFranja; }
  get activarTemaAzulESBI() { return this.uiState.activarTemaAzulESBI; }
  get ocultarElementosTrascendiendo() { return this.uiState.ocultarElementosTrascendiendo; }
  get usarLoginPortalGYT() { return this.uiState.usarLoginPortalGYT; }
}
