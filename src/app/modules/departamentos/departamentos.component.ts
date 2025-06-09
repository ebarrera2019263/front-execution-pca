import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { MatPaginator } from '@angular/material/paginator';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { DepartamentoFormComponent } from '../../components/departamento-form.component';
import { DepartamentoService, DepartamentoDto } from '../../services/departamento.service';

@Component({
  selector: 'app-departamentos',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzButtonModule,
    NzTableModule,
    NzInputModule,
    NzModalModule,
    NzIconModule,
    NzPaginationModule,
    MatPaginator
  ],
  templateUrl: './departamentos.component.html',
  styleUrls: ['./departamentos.component.scss']
})
export class DepartamentosComponent {
  searchValue: string = '';
  departamentos: DepartamentoDto[] = [];
  departamentosFiltrados: DepartamentoDto[] = [];
  paginados: DepartamentoDto[] = [];
  totalFiltrados: number = 0;
  paginaActual: number = 1;
  pageSize: number = 5;

  constructor(
    private departamentoService: DepartamentoService,
    private modal: NzModalService
  ) {
    this.loadDepartamentos();
  }

  loadDepartamentos(): void {
    this.departamentoService.getAll().subscribe({
      next: (data) => {
        console.log('[Departamentos] Registros recibidos:', data.length);
        this.departamentos = data;
        this.filtrarYPaginar();
      },
      error: (err) => {
        console.error('[Departamentos] Error al cargar:', err);
      }
    });
  }

  filtrarYPaginar(): void {
    const termino = this.searchValue.trim().toLowerCase();
    this.departamentosFiltrados = termino
      ? this.departamentos.filter(d =>
          d.depdes.toLowerCase().includes(termino)
        )
      : [...this.departamentos];

    this.totalFiltrados = this.departamentosFiltrados.length;
    this.paginaActual = 1;
    this.actualizarPaginados();
  }

  actualizarPaginados(): void {
    const inicio = (this.paginaActual - 1) * this.pageSize;
    const fin = inicio + this.pageSize;
    this.paginados = this.departamentosFiltrados.slice(inicio, fin);
  }

  onBuscar(): void {
    this.filtrarYPaginar();
  }

  onCambioPagina(pagina: number): void {
    this.paginaActual = pagina;
    this.actualizarPaginados();
  }

  onNuevo(): void {
    this.departamentoService.getSiguienteCodigo().subscribe({
      next: (res) => {
        const modalRef = this.modal.create({
          nzTitle: 'Nuevo Departamento',
          nzContent: DepartamentoFormComponent,
          nzFooter: null
        });

        modalRef.afterOpen.subscribe(() => {
          const instance = modalRef.getContentComponent();
          if (instance) {
            instance.setInitialCodigo(res.codigo);
          }
        });

        modalRef.afterClose.subscribe((nuevoDepartamento: DepartamentoDto) => {
          if (nuevoDepartamento) {
            this.departamentoService.create(nuevoDepartamento).subscribe({
              next: () => this.loadDepartamentos(),
              error: (err) => console.error('[Departamentos] Error al crear:', err)
            });
          }
        });
      },
      error: (err) => {
        console.error('[Departamentos] Error al obtener código:', err);
      }
    });
  }

  onEditar(departamento: DepartamentoDto): void {
    const modalRef = this.modal.create({
      nzTitle: 'Editar Departamento',
      nzContent: DepartamentoFormComponent,
      nzFooter: null
    });

    modalRef.afterOpen.subscribe(() => {
      const instance = modalRef.getContentComponent();
      if (instance) {
        instance.isEdit = true;
        instance.form.patchValue(departamento);
        instance.form.get('depcod')?.disable();
      }
    });

    modalRef.afterClose.subscribe((actualizado: DepartamentoDto) => {
      if (actualizado) {
        this.departamentoService.update(actualizado).subscribe({
          next: () => this.loadDepartamentos(),
          error: (err) => console.error('[Departamentos] Error al actualizar:', err)
        });
      }
    });
  }
}
