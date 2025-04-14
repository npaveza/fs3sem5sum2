import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { Publicacion, PublicacionService } from '../../services/publicacion.service';


@Component({
  selector: 'app-publicaciones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './publicaciones.component.html',
  styleUrl: './publicaciones.component.css'
})
export class PublicacionesComponent implements OnInit {
  publicaciones: Publicacion[] = [];

  constructor(private publicacionService: PublicacionService) {}

  ngOnInit(): void {
    this.cargarPublicaciones();
  }

  cargarPublicaciones() {
    this.publicacionService.obtenerTodasLasPublicaciones().subscribe(data => {
      this.publicaciones = data;
    });
  }

  banear(id: number) {
    const usuarioActual = {
      id: 1,
      nombre: 'Admin',
      apellido: '',
      email: '',
      rol: 'ADMIN'
    };
    
    this.publicacionService.banearPublicacion(id, usuarioActual).subscribe(() => {
      this.cargarPublicaciones();
    });
  }
}