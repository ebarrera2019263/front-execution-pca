import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ThemeConfig {
  sidebarColor: string;
  navbarColor: string;
  primaryColor: string;
}

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private themeSubject = new BehaviorSubject<ThemeConfig>({
    sidebarColor: '#082748',
    navbarColor: '#082748',
    primaryColor: '#1677ff'
  });

  theme$ = this.themeSubject.asObservable();

  constructor() {
    this.loadStoredTheme();
  }

  updateTheme(config: Partial<ThemeConfig>) {
    const newTheme = { ...this.themeSubject.value, ...config };
    this.themeSubject.next(newTheme);
    this.applyTheme(newTheme);
    localStorage.setItem('app-theme', JSON.stringify(newTheme));
  }

  loadStoredTheme() {
    const stored = localStorage.getItem('app-theme');
    if (stored) {
      const parsed = JSON.parse(stored);
      this.themeSubject.next(parsed);
      this.applyTheme(parsed);
    }
  }

  private applyTheme(theme: ThemeConfig) {
    document.documentElement.style.setProperty('--sidebar-color', theme.sidebarColor);
    document.documentElement.style.setProperty('--navbar-color', theme.navbarColor);
    document.documentElement.style.setProperty('--primary-color', theme.primaryColor);
  }
}
