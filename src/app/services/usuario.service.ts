import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// Interfaz para tipar los usuarios
export interface Usuario {
    id: number;
    nombre: string;
    apellido?: string;
    email: string;
    contrasena?: string;
    rol: string;
}

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {
    private apiUrl = 'http://localhost:8080/api/usuarios';

    constructor(private http: HttpClient) { }

    // Obtener todos los usuarios
    obtenerUsuarios(): Observable<Usuario[]> {
        return this.http.get<Usuario[]>(this.apiUrl);
    }

    // Obtener un usuario por ID
    obtenerUsuario(id: number): Observable<Usuario> {
        return this.http.get<Usuario>(`${this.apiUrl}/${id}`);
    }

    // Crear nuevo usuario
    crearUsuario(usuario: Usuario): Observable<Usuario> {
        return this.http.post<Usuario>(this.apiUrl, usuario);
    }

    // Actualizar usuario por ID
    actualizarUsuario(id: number, usuario: Usuario): Observable<Usuario> {
        return this.http.put<Usuario>(`${this.apiUrl}/${id}`, usuario);
    }

    // Eliminar usuario por ID
    eliminarUsuario(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}