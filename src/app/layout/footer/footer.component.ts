import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzDividerModule } from 'ng-zorro-antd/divider';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, NzDividerModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}
