import { Component } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-puestos',
  standalone: true,
  templateUrl: './puestos.component.html',
  styleUrls: ['./puestos.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    NzButtonModule,
    NzTableModule,
    NzInputModule,
    NzSelectModule
  ]
})
export class PuestosComponent {
  cantidad: number = 15;
  searchValue: string = '';

  puestos = [
    { codigo: '100', nombre: 'Encargado Administrativo' },
    { codigo: '101', nombre: 'Director De Proagro' },
    { codigo: '102', nombre: 'Técnico Agropecuario' },
    { codigo: '103', nombre: 'Coordinador Técnico' },
    { codigo: '104', nombre: 'JEFE DE AGENCIA/GERENTE' },
    { codigo: '105', nombre: 'AGENTE DE VENTAS' }
  ];

  get puestosFiltrados() {
    if (!this.searchValue.trim()) return this.puestos;
    return this.puestos.filter(p =>
      p.nombre.toLowerCase().includes(this.searchValue.toLowerCase())
    );
  }

  onNuevo() {
    console.log('Nuevo puesto');
  }
}
