import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ZonaDto {
  empcod: number;
  zoncod: number;
  zondes: string;
  bitacora?: string;
}

@Injectable({ providedIn: 'root' })
export class ZonaService {
  private apiUrl = 'http://localhost:5286/api/zonas';

  constructor(private http: HttpClient) {}

  getAll(): Observable<ZonaDto[]> {
    return this.http.get<ZonaDto[]>(this.apiUrl);
  }

  create(zona: ZonaDto): Observable<any> {
    return this.http.post(this.apiUrl, zona);
  }

  delete(empcod: number, zoncod: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${empcod}/${zoncod}`);
  }

  getSiguienteCodigo(): Observable<{ codigo: number }> {
  return this.http.get<{ codigo: number }>(`${this.apiUrl}/siguiente-codigo`);
}

}
