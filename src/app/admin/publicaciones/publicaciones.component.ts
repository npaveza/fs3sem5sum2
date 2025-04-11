import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-publicaciones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './publicaciones.component.html',
  styleUrl: './publicaciones.component.css'
})
export class PublicacionesComponent {
  publicaciones: any[] = [
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
      titulo: 'Abro debate: ¿piratear o pagar?',
      descripcion: 'Vale la pena pagar Crunchyroll?',
      autor: 'Admin'
    }
  ];

  banear(id: number) {
    this.publicaciones = this.publicaciones.filter(p => p.id !== id);
  }
}