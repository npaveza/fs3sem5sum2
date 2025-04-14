import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  private apiUrl = 'http://localhost:8080/api/comentarios';

  constructor(private http: HttpClient) { }

  obtenerComentariosPorPublicacion(publicacionId: number) {
    return this.http.get(`${this.apiUrl}/publicacion/${publicacionId}`);
  }

  agregarComentario(comentario: any) {
    return this.http.post(this.apiUrl, comentario);
  }

  banearComentario(id: number, usuario: any) {
    return this.http.put(`${this.apiUrl}/${id}/banear`, usuario);
  }

  getTodos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}