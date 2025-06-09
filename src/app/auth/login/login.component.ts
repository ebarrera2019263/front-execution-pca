import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService, LoginResponse } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  showPassword = false;
  isLoading = false;
  language: 'es' | 'en' = 'es';

  mostrarNuevaFranja = false;
  puedeModificarCompromisos = false;
  permitirGuardarComoCompromiso = false;
  activarTemaAzulESBI = false;
  ocultarElementosTrascendiendo = false;
  usarLoginPortalGYT = false;

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

  get t() {
    return this.translations[this.language];
  }

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      remember: [false]
    });
  }

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
        next: (response: LoginResponse) => {
          if (response.requires2FA) {
            this.authService.tempUsername = response.username;
            this.authService.tempToken = response.token;
            this.router.navigate(['/verificacion-2fa']);
          } else {
            this.authService.saveToken(response.token);
            this.authService.saveUsername(response.username);

            this.mostrarNuevaFranja = response.mostrarNuevaFranja;
            this.puedeModificarCompromisos = response.puedeModificarCompromisos;
            this.permitirGuardarComoCompromiso = response.permitirGuardarComoCompromiso;
            this.activarTemaAzulESBI = response.activarTemaAzulESBI;
            this.ocultarElementosTrascendiendo = response.ocultarElementosTrascendiendo;
            this.usarLoginPortalGYT = response.usarLoginPortalGYT;

            this.router.navigate(['/welcome']);
          }

          this.isLoading = false;
        },
        error: (err) => {
          console.error('Login error:', err);
          this.isLoading = false;
        }
      });
    }
  }
}
