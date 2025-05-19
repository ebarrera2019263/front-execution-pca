import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth/login'
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'welcome'
      },
      {
        path: 'welcome',
        loadChildren: () =>
          import('./pages/welcome/welcome.routes').then(m => m.WELCOME_ROUTES)
      },
      {
        path: 'organizacion',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./modules/organization.routes').then(m => m.ORGANIZATION_ROUTES)
          }
        ]
      },
      {
        path: 'personalizar-tema',
        loadComponent: () =>
          import('./theme-customizer/theme-customizer.component').then(m => m.ThemeCustomizerComponent)
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'auth/login'
  }
];
