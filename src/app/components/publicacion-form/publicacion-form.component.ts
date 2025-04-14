import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Publicacion } from '../../models/publicacion.model';
import { PublicacionService } from '../../services/publicacion.service';

@Component({
  selector: 'app-publicacion-form',
  standalone: true,
  imports: [BrowserModule, FormsModule],
  templateUrl: './publicacion-form.component.html',
  styleUrl: './publicacion-form.component.css'
})
export class CrearPublicacionComponent {
  publicacion: Publicacion = {
    titulo: '',
    contenido: '',
    autor: {
      id: 0,
      nombre: '',
      apellido: '',
      email: '',
      rol: '',
      contrasena: ''
    }
  };

  constructor(
    private publicacionService: PublicacionService,
    private router: Router
  ) { }

  crearPublicacion() {
    const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual') || 'null');

    if (!usuarioActual) {
      alert('Debes iniciar sesión para publicar.');
      this.router.navigate(['/login']);
      return;
    }

    this.publicacion.autor = {
      id: usuarioActual.id,
      nombre: usuarioActual.nombre,
      apellido: usuarioActual.apellido,
      email: usuarioActual.email,
      rol: usuarioActual.rol,
      contrasena: usuarioActual.contrasena
    };

    this.publicacionService.crearPublicacion(this.publicacion).subscribe({
      next: () => {
        alert('Publicación creada exitosamente');
        this.router.navigate(['/publicaciones']);
      },
      error: (err) => {
        console.error(err);
        alert('Error al crear publicación');
      }
    });
  }
}
