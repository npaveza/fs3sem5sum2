import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-foro',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './foro.component.html',
  styleUrl: './foro.component.css'
})
export class ForoComponent {
  publicaciones = [
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
    }
  ];
}