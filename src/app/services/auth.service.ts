import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  getUsuarioActual(): any {
    const usuario = localStorage.getItem('usuarioActual');
    return usuario ? JSON.parse(usuario) : null;
  }

  estaAutenticado(): boolean {
    return this.getUsuarioActual() !== null;
  }

  cerrarSesion() {
    localStorage.removeItem('usuarioActual');
  }
}
