import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule }             from '@angular/common';
import { Router, RouterModule }     from '@angular/router';

// NG-ZORRO
import { NzLayoutModule }   from 'ng-zorro-antd/layout';
import { NzBadgeModule }    from 'ng-zorro-antd/badge';
import { NzIconModule }     from 'ng-zorro-antd/icon';
import { NzButtonModule }   from 'ng-zorro-antd/button';

// Angular Material (solo para el dropdown de usuario)
import { MatMenuModule }    from '@angular/material/menu';
import { MatButtonModule }  from '@angular/material/button';
import { MatIconModule }    from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NzLayoutModule,
    NzBadgeModule,
    NzIconModule,
    NzButtonModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @Input() isCollapsed = false;
  @Output() toggleSidebar = new EventEmitter<void>();

  // contadores de ejemplo
  messageCount = 3;
  notificationCount = 5;

  constructor(public router: Router) {}

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }
}
