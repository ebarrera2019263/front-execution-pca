import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

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

  translations = {
    es: {
      email: 'Usuario',
      password: 'Contraseña',
      remember: 'Recordar sesión',
      login: 'Iniciar',
      forgot: '¿Olvidó su contraseña?',
      toggleLang: 'Traducir EN/ES',
      slogan: 'Creando una cultura de alto desempeño'
    },
    en: {
      email: 'Email',
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

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      remember: [false]
    });
  }

  ngOnInit(): void {
    const savedEmail = localStorage.getItem('rememberEmail');
    const savedLang = localStorage.getItem('language');
    if (savedEmail) {
      this.form.patchValue({ email: savedEmail, remember: true });
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

      if (this.form.value.remember) {
        localStorage.setItem('rememberEmail', this.form.value.email);
      } else {
        localStorage.removeItem('rememberEmail');
      }

      setTimeout(() => {
        this.isLoading = false;
        console.log('Login:', this.form.value);
      }, 2000);
    }
  }
}
