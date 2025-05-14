import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';

export const routes: Routes = [
  //  Redirección inicial al login
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth/login'
  },

  //  Módulo de autenticación
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },

  // Rutas protegidas bajo layout principal
  {
    path: '',
    component: LayoutComponent,
    children: [
      // Redirige a 'welcome' como dashboard por defecto
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'welcome'
      },
      // Componente Welcome (dashboard)
      {
        path: 'welcome',
        loadChildren: () =>
          import('./pages/welcome/welcome.routes').then(m => m.WELCOME_ROUTES)
      },
      //  Aquí puedes seguir agregando más rutas hijas como evaluación, clima, etc.
    ]
  },

  //  Fallback para rutas no encontradas
  {
    path: '**',
    redirectTo: 'auth/login'
  }
];
