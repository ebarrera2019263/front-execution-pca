import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface SubEmpresaDto {
  empcod: number;
  subempcod: number;
  nombre: string;
  bitacora?: string;
}

@Injectable({ providedIn: 'root' })
export class SubEmpresaService {
  private apiUrl = 'http://localhost:5286/api/subempresas';

  constructor(private http: HttpClient) {}

  getAll(): Observable<SubEmpresaDto[]> {
    return this.http.get<SubEmpresaDto[]>(this.apiUrl);
  }

  create(data: SubEmpresaDto): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  getSiguienteCodigo(): Observable<{ codigo: number }> {
    return this.http.get<{ codigo: number }>(`${this.apiUrl}/siguiente-codigo`);
  }
}
