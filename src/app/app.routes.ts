import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
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
        canActivate: [authGuard],
        loadChildren: () =>
          import('./pages/welcome/welcome.routes').then(m => m.WELCOME_ROUTES)
      },
      {
        path: 'organizacion',
        canActivate: [authGuard],
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
        canActivate: [authGuard], // también protegido si quieres
        loadComponent: () =>
          import('./theme-customizer/theme-customizer.component').then(m => m.ThemeCustomizerComponent)
      },
      {
  path: 'perfil',
  canActivate: [authGuard],
  loadComponent: () =>
    import('./components/perfil.component').then(m => m.PerfilComponent)
},
{
  path: 'verificacion-2fa',
  canActivate: [authGuard],
  loadComponent: () =>
    import('./components/verificacion2fa.component').then(m => m.Verificacion2faComponent)
},

    ]
  },
  {
    path: '**',
    redirectTo: 'auth/login'
  }
];
