import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { FormsModule } from '@angular/forms';
import { SubEmpresaFormComponent } from '../../components/sub-empresa-form.component';
import { SubEmpresaService, SubEmpresaDto } from '../../services/sub-empresa.service';
import { NzTableModule } from 'ng-zorro-antd/table';

@Component({
  selector: 'app-sub-empresas',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzButtonModule,
    NzInputModule,
    NzModalModule,
    NzTableModule
  ],
  templateUrl: './sub-empresas.component.html',
  styleUrls: ['./sub-empresas.component.scss']
})
export class SubEmpresasComponent {
  searchValue = '';
  subEmpresas: SubEmpresaDto[] = [];

  constructor(
    private service: SubEmpresaService,
    private modal: NzModalService
  ) {
    this.loadData();
  }

  get filtradas(): SubEmpresaDto[] {
    const termino = this.searchValue.toLowerCase().trim();
    return !termino ? this.subEmpresas : this.subEmpresas.filter(e => e.nombre.toLowerCase().includes(termino));
  }

  loadData(): void {
    this.service.getAll().subscribe({
      next: data => this.subEmpresas = data,
      error: err => console.error('Error cargando subempresas', err)
    });
  }

  onNuevo(): void {
    this.service.getSiguienteCodigo().subscribe({
      next: res => {
        const modalRef = this.modal.create({
          nzTitle: 'Nueva Sub-Empresa',
          nzContent: SubEmpresaFormComponent,
          nzFooter: null
        });

        modalRef.afterOpen.subscribe(() => {
          const instance = modalRef.getContentComponent();
          if (instance) {
            instance.setInitialCodigo(res.codigo);
          }
        });

        modalRef.afterClose.subscribe((nueva: SubEmpresaDto) => {
          if (nueva) {
            this.service.create(nueva).subscribe(() => this.loadData());
          }
        });
      },
      error: err => console.error('Error obteniendo siguiente código', err)
    });
  }
}
