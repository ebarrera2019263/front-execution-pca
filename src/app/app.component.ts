import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './layout/navbar/navbar.component';

import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ThemeService } from './services/theme.service';
import { FooterComponent } from './layout/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    NzDropDownModule,
    NzMenuModule,
    NzButtonModule,
    NzIconModule,
    FooterComponent

  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private themeService: ThemeService) {

  }

  get themeConfig() {
    const styles = getComputedStyle(document.documentElement);
    return {
      token: {
        colorPrimary: styles.getPropertyValue('--ant-primary-color') || '#1677ff',
        borderRadius: parseInt(styles.getPropertyValue('--ant-border-radius')) || 4,
        colorBgContainer: styles.getPropertyValue('--ant-color-bg-container') || '#ffffff',
        colorText: styles.getPropertyValue('--ant-color-text') || '#000000'
      }
    };
  }
}
