import { Injectable, signal } from '@angular/core';
import { LoginResponse } from './auth.service';

@Injectable({ providedIn: 'root' })
export class UiStateService {
  private loginState = signal<LoginResponse | null>(null);

  setLoginState(state: LoginResponse) {
    this.loginState.set(state);
  }

  get state() {
    return this.loginState();
  }

  get mostrarNuevaFranja() {
    return this.loginState()?.mostrarNuevaFranja ?? false;
  }

  get puedeModificarCompromisos() {
    return this.loginState()?.puedeModificarCompromisos ?? false;
  }

  get permitirGuardarComoCompromiso() {
    return this.loginState()?.permitirGuardarComoCompromiso ?? false;
  }

  get activarTemaAzulESBI() {
    return this.loginState()?.activarTemaAzulESBI ?? false;
  }

  get ocultarElementosTrascendiendo() {
    return this.loginState()?.ocultarElementosTrascendiendo ?? false;
  }

  get usarLoginPortalGYT() {
    return this.loginState()?.usarLoginPortalGYT ?? false;
  }

  get mostrarBotonReinicio() {
    return this.loginState()?.mostrarBotonReinicio ?? false;
  }
}
