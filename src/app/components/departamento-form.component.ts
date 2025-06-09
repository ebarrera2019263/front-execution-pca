import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { DepartamentoService } from '../services/departamento.service';

@Component({
  selector: 'app-departamento-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NzButtonModule, NzInputModule],
  templateUrl: './departamento-form.component.html'
})
export class DepartamentoFormComponent {
  form: FormGroup;
  @Input() isEdit: boolean = false;

  constructor(
    private fb: FormBuilder,
    private modal: NzModalRef,
    private departamentoService: DepartamentoService
  ) {
    this.form = this.fb.group({
      empcod: [1, Validators.required], // Si luego se necesita dinámico, se puede cambiar
      depcod: [{ value: '', disabled: true }],
      depdes: ['', Validators.required],
      misionParticipa: ['']
    });

    // Solo si no es edición, generamos un nuevo código
    if (!this.isEdit) {
      this.departamentoService.getSiguienteCodigo().subscribe({
        next: res => this.form.get('depcod')?.setValue(res.codigo),
        error: err => console.error('Error al obtener siguiente código', err)
      });
    }
  }

 submit(): void {
  console.log('[DepartamentoForm] Submit triggered');

  if (this.form.valid) {
    const nuevoDepartamento = this.form.getRawValue();
    nuevoDepartamento.bitacora = 'plink';

    console.log('[DepartamentoForm] Enviando datos al modal:', nuevoDepartamento);

    this.modal.close(nuevoDepartamento);
  } else {
    console.warn('[DepartamentoForm] Formulario inválido:', this.form.errors);
  }
}


  cancel(): void {
    this.modal.destroy();
  }

  setInitialCodigo(codigo: number): void {
    this.form.get('depcod')?.setValue(codigo);
  }
}
