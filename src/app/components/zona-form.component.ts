import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { CommonModule } from '@angular/common';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ZonaService } from '../services/zona.service';

@Component({
  selector: 'app-zona-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NzInputModule, NzButtonModule],
  templateUrl: './zona-form.component.html'
})
export class ZonaFormComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private modal: NzModalRef, private zonaService: ZonaService) {
  this.form = this.fb.group({
    empcod: [1, Validators.required],
    zoncod: [{ value: '', disabled: true }],
    zondes: ['', Validators.required],
    bitacora: ['']
  });

  this.zonaService.getSiguienteCodigo().subscribe({
    next: res => this.form.get('zoncod')?.setValue(res.codigo),
    error: err => console.error('[ZonaForm] Error al obtener código siguiente', err)
  });
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
