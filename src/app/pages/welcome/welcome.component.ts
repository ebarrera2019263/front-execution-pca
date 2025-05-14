import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';


@Component({
  selector: 'app-welcome',
  imports: [CommonModule, NzIconModule],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss'
})
export class WelcomeComponent {
   constructor(private router: Router) {}

  tiles = [
    { label: 'Desempeño', icon: 'bar-chart', route: '/desempeno' },
    { label: 'Grupos', icon: 'appstore', route: '/grupos' },
    { label: 'Avances KPI', icon: 'line-chart', route: '/kpi' },
    { label: 'Cuadro 4', icon: 'border', route: '/cuadro4' },
    { label: 'Consulta STD', icon: 'desktop', route: '/consulta' },
    { label: 'Reuniones', icon: 'calendar', route: '/reuniones' },
    { label: 'Ideas', icon: 'bulb', route: '/ideas' },
    { label: 'Eventos', icon: 'schedule', route: '/eventos' },
    { label: 'Oficina de Innovación', icon: 'inbox', route: '/oficina' },
    { label: 'Equipos', icon: 'team', route: '/equipos' },
    { label: 'Dashboard', icon: 'dashboard', route: '/dashboard' },
  ];

  resumen = {
  compromisos: 5,
  actividades: 183,
  oportunidades: 0
};


  navigate(route: string) {
    this.router.navigate([route]);
  }
}
