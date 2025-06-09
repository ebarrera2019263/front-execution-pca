import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ZonaService, ZonaDto } from '../../services/zona.service';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { ZonaFormComponent } from '../../components/zona-form.component';

@Component({
  selector: 'app-zonas',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzTableModule,
    NzButtonModule,
    NzInputModule,
    NzModalModule
  ],
  templateUrl: './zonas.component.html',
  styleUrls: ['./zonas.component.scss']
})
export class ZonasComponent {
  zonas: ZonaDto[] = [];
  search: string = '';

  constructor(
    private zonaService: ZonaService,
    private modal: NzModalService
  ) {
    this.loadZonas();
  }

  get zonasFiltradas(): ZonaDto[] {
    const termino = this.search.trim().toLowerCase();
    return termino
      ? this.zonas.filter(z => z.zondes.toLowerCase().includes(termino))
      : this.zonas;
  }

  loadZonas(): void {
    this.zonaService.getAll().subscribe({
      next: res => this.zonas = res,
      error: err => console.error('[Zonas] Error cargando zonas', err)
    });
  }

  onAgregar(): void {
    const modalRef = this.modal.create({
      nzTitle: 'Agregar Zona',
      nzContent: ZonaFormComponent,
      nzFooter: null
    });

    modalRef.afterClose.subscribe((nueva: ZonaDto) => {
      if (nueva) {
        this.zonaService.create(nueva).subscribe({
          next: () => this.loadZonas(),
          error: err => console.error('[Zonas] Error al crear zona', err)
        });
      }
    });
  }

  eliminar(zona: ZonaDto): void {
    if (!confirm(`¿Eliminar la zona "${zona.zondes}"?`)) return;

    this.zonaService.delete(zona.empcod, zona.zoncod).subscribe({
      next: () => this.loadZonas(),
      error: err => console.error('[Zonas] Error al eliminar zona', err)
    });
  }
}
