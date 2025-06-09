import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DepartamentoDto {
  empcod: number;
  depcod: number;
  depdes: string;
  misionParticipa?: string;
  bitacora?: string;
}

@Injectable({ providedIn: 'root' })
export class DepartamentoService {
  private apiUrl = 'http://localhost:5286/api/departamentos';

  constructor(private http: HttpClient) {}

  getAll(): Observable<DepartamentoDto[]> {
    return this.http.get<DepartamentoDto[]>(this.apiUrl);
  }

  getById(empcod: number, depcod: number): Observable<DepartamentoDto> {
    return this.http.get<DepartamentoDto>(`${this.apiUrl}/${empcod}/${depcod}`);
  }

  create(departamento: DepartamentoDto): Observable<any> {
    return this.http.post(this.apiUrl, departamento);
  }

  update(departamento: DepartamentoDto): Observable<any> {
    return this.http.put(`${this.apiUrl}/${departamento.empcod}/${departamento.depcod}`, departamento);
  }

  delete(empcod: number, depcod: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${empcod}/${depcod}`);
  }

  getSiguienteCodigo(): Observable<{ codigo: number }> {
    return this.http.get<{ codigo: number }>(`${this.apiUrl}/siguiente-codigo`);
  }
}
