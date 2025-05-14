import { Routes } from '@angular/router';
import { PuestosComponent } from './puestos/puestos.component';
import { EmpleadosComponent } from './empleados/empleados.component';
import { DepartamentosComponent } from './departamentos/departamentos.component';
import { ZonasComponent } from './zonas/zonas.component';

export const ORGANIZATION_ROUTES: Routes = [
  { path: 'puestos', component: PuestosComponent },
  { path: 'empleados', component: EmpleadosComponent },
  { path: 'departamentos', component: DepartamentosComponent },
  { path: 'zonas', component: ZonasComponent },
];
