import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { PuestoFormComponent } from '../../components/puesto-form.component';
import { PuestoService } from '../../services/puestos.service';

@Component({
  selector: 'app-puestos',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzButtonModule,
    NzTableModule,
    NzInputModule,
    NzSelectModule,
    NzModalModule
  ],
  templateUrl: './puestos.component.html',
  styleUrls: ['./puestos.component.scss']
})
export class PuestosComponent {
  cantidad: number = 15;
  searchValue: string = '';
  puestos: any[] = [];

  constructor(
    private puestoService: PuestoService,
    private modal: NzModalService
  ) {
    this.loadPuestos();
  }

  get puestosFiltrados(): any[] {
    const termino = this.searchValue.trim().toLowerCase();
    if (!termino) return this.puestos;
    return this.puestos.filter(p =>
      p.nombre.toLowerCase().includes(termino)
    );
  }

  loadPuestos(): void {
    this.puestoService.getAll().subscribe({
      next: (data) => {
        console.log('Puestos cargados:', data);
        this.puestos = data;
      },
      error: (err) => {
        console.error('Error al cargar puestos:', err);
      }
    });
  }

onNuevo(): void {
  this.puestoService.getSiguienteCodigo().subscribe({
    next: (res) => {
      const modalRef = this.modal.create({
        nzTitle: 'Agregar nuevo puesto',
        nzContent: PuestoFormComponent,
        nzFooter: null
      });

      modalRef.afterOpen.subscribe(() => {
        const instance = modalRef.getContentComponent();
        if (instance) {
          instance.codigoInicial = res.codigo;
        }
      });

      modalRef.afterClose.subscribe((nuevoPuesto) => {
        if (nuevoPuesto) {
          this.puestoService.create(nuevoPuesto).subscribe({
            next: () => this.loadPuestos(),
            error: (err) => console.error('Error al guardar puesto:', err)
          });
        }
      });
    },
    error: (err) => {
      console.error('Error al obtener código:', err);
    }
  });
}

}
