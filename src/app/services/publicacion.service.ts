import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  rol: string;
}

export interface Publicacion {
  id?: number;
  titulo: string;
  contenido: string;
  baneado?: boolean;
  autor: Usuario;
}

@Injectable({
  providedIn: 'root'
})
export class PublicacionService {

  private apiUrl = 'http://localhost:8080/api/publicaciones';

  constructor(private http: HttpClient) {}

  obtenerTodasLasPublicaciones(): Observable<Publicacion[]> {
    return this.http.get<Publicacion[]>(this.apiUrl);
  }

  obtenerPublicacionPorId(id: number): Observable<Publicacion> {
    return this.http.get<Publicacion>(`${this.apiUrl}/${id}`);
  }

  crearPublicacion(publicacion: Publicacion): Observable<Publicacion> {
    return this.http.post<Publicacion>(this.apiUrl, publicacion);
  }

  actualizarPublicacion(id: number, publicacion: Publicacion): Observable<Publicacion> {
    return this.http.put<Publicacion>(`${this.apiUrl}/${id}`, publicacion);
  }

  eliminarPublicacion(id: number, usuario: Usuario): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { body: usuario });
  }

  banearPublicacion(id: number, usuario: Usuario): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/banear`, usuario);
  }

  obtenerPorAutorId(idAutor: number): Observable<Publicacion[]> {
    return this.http.get<Publicacion[]>(`${this.apiUrl}/autor/${idAutor}`);
  }
}
