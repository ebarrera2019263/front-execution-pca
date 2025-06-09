import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { CommonModule } from '@angular/common';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-sub-empresa-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NzInputModule, NzButtonModule],
  templateUrl: './sub-empresa-form.component.html'
})
export class SubEmpresaFormComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private modal: NzModalRef
  ) {
    this.form = this.fb.group({
      empcod: [1, Validators.required],
      subempcod: [{ value: '', disabled: true }],
      nombre: ['', Validators.required]
    });
  }

  setInitialCodigo(codigo: number): void {
    this.form.get('subempcod')?.setValue(codigo);
  }

  submit(): void {
    if (this.form.valid) {
      this.modal.close(this.form.getRawValue());
    }
  }

  cancel(): void {
    this.modal.destroy();
  }
}
