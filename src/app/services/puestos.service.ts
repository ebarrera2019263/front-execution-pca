import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PuestoService {
  private apiUrl = 'http://localhost:5286/api/puestos';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

    getAllPuestos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/puestos`);
  }

 getCompetenciasClaveByFamilia(familiaId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/puestos/competencias-clave/${familiaId}`);
  }

  // Obtener catálogo de competencias técnicas
  getCompetenciasTecnicas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/competencias-tecnicas`);
  }

  // Obtener catálogo de MCIs
  getMcis(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/mcis`);
  }






  create(puesto: { codigo: number; nombre: string }): Observable<any> {
    return this.http.post(this.apiUrl, {
      codigo: puesto.codigo,
      nombre: puesto.nombre
    });
  }
    getCatalogo(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/catalogo`);
  }


  getMcisByPuesto(puestoCod: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/mcis/${puestoCod}`);
  }

  getSiguienteCodigo(): Observable<{ codigo: number }> {
  return this.http.get<{ codigo: number }>(`${this.apiUrl}/siguiente-codigo`);
}

}
