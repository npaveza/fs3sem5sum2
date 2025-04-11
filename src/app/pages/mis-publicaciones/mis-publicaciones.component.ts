import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mis-publicaciones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mis-publicaciones.component.html',
  styleUrl: './mis-publicaciones.component.css'
})
export class MisPublicacionesComponent {
  publicaciones: any[] = [];
  usuario: any = null;

  constructor(private router: Router) {
    const usuarioActual = localStorage.getItem('usuarioActual');
    this.usuario = usuarioActual ? JSON.parse(usuarioActual) : null;

    const todas = [
      {
        id: 1,
        titulo: '¿Cuál es tu juego favorito?',
        descripcion: 'Comparte tu juego favorito con la comunidad.',
        autor: 'Nicolás'
      },
      {
        id: 2,
        titulo: 'Recomendaciones de anime',
        descripcion: '¿Qué anime deberíamos ver este mes?',
        autor: 'Valentina'
      },
      {
        id: 3,
        titulo: '¿Vale la pena pagar Crunchyroll?',
        descripcion: 'Abro debate, ¿pagar o piratear?',
        autor: 'Admin'
      },
      {
        id: 4,
        titulo: 'Tu primer juego favorito',
        descripcion: 'Recuerdos de infancia gamer.',
        autor: this.usuario?.nombre || ''
      }
    ];

    // Solo mostrar las del usuario actual
    this.publicaciones = todas.filter(p => p.autor === this.usuario?.nombre);
  }

  irADetalle(id: number) {
    this.router.navigate(['/foro', id]);
  }
}