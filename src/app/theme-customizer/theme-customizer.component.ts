import { Component } from '@angular/core';
import { ThemeService } from '../services/theme.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-theme-customizer',
  standalone: true,
  templateUrl: './theme-customizer.component.html',
  styleUrls: ['./theme-customizer.component.scss'],
  imports: [FormsModule],
})
export class ThemeCustomizerComponent {
  sidebarColor = '#082748';
  navbarColor = '#082748';
  primaryColor = '#1677ff';

  constructor(private themeService: ThemeService) {}

  applyTheme() {
    this.themeService.updateTheme({
      sidebarColor: this.sidebarColor,
      navbarColor: this.navbarColor,
      primaryColor: this.primaryColor,
    });
  }

  ngOnInit() {
    const stored = localStorage.getItem('app-theme');
    if (stored) {
      const theme = JSON.parse(stored);
      this.sidebarColor = theme.sidebarColor;
      this.navbarColor = theme.navbarColor;
      this.primaryColor = theme.primaryColor;
    }
  }
}
