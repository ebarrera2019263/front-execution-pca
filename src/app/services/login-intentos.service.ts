import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoginIntentosService {
  private intentos = signal(0);
  private readonly maxIntentos = 6;
  private readonly avisoCorreoIntento = 4;

  registrarIntentoFallido(): void {
    this.intentos.update(n => n + 1);
  }

  resetearIntentos(): void {
    this.intentos.set(0);
  }

  get intentosActuales(): number {
    return this.intentos();
  }

  get mostrarAdvertenciaCorreo(): boolean {
    return this.intentos() >= this.avisoCorreoIntento && this.intentos() < this.maxIntentos;
  }

  get estaBloqueado(): boolean {
    return this.intentos() >= this.maxIntentos;
  }
}
