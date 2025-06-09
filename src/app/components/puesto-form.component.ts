import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSwitchModule } from 'ng-zorro-antd/switch';

@Component({
  selector: 'app-puesto-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzInputModule,
    NzSwitchModule
  ],
  templateUrl: './puesto-form.component.html',
})
export class PuestoFormComponent {
  form: FormGroup;
  codigoInicial: number | null = null;

  constructor(private fb: FormBuilder, private modal: NzModalRef) {
    this.form = this.fb.group({
      codigo: [null, Validators.required],
      nombre: ['', Validators.required],
      nombreAlterno: [''],
      descripcion: [''],
      proposito: [''],
      activo: [true]
    });
  }

  ngOnInit(): void {
    if (this.codigoInicial !== null) {
      this.form.patchValue({ codigo: this.codigoInicial });
    }
  }

  submit(): void {
    if (this.form.valid) {
      this.modal.close(this.form.value);
    }
  }

  cancel(): void {
    this.modal.destroy();
  }
}
