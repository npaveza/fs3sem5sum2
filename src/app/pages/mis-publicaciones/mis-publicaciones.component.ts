import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PublicacionService, Usuario } from '../../services/publicacion.service';

@Component({
  selector: 'app-mis-publicaciones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mis-publicaciones.component.html',
  styleUrl: './mis-publicaciones.component.css'
})
export class MisPublicacionesComponent implements OnInit {
  publicaciones: any[] = [];
  usuario: Usuario | null = null;

  constructor(private publicacionService: PublicacionService, private router: Router) {
    const usuarioActual = localStorage.getItem('usuarioActual');
    this.usuario = usuarioActual ? JSON.parse(usuarioActual) : null;
  }

  ngOnInit(): void {
    if (this.usuario) {
      this.publicacionService.obtenerPorAutorId(this.usuario.id).subscribe(
        (publicaciones) => {
          this.publicaciones = publicaciones;
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  irADetalle(id: number) {
    this.router.navigate(['/foro', id]);
  }
}