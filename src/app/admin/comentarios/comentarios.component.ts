import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-comentarios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comentarios.component.html',
  styleUrl: './comentarios.component.css'
})
export class ComentariosComponent {
  comentarios: any[] = [
    { id: 1, autor: 'usuario1', mensaje: 'Me gusta Zelda' },
    { id: 2, autor: 'usuario2', mensaje: 'Call of Duty es mejor que Fortnite' },
    { id: 3, autor: 'troll', mensaje: 'Ustedes son unos idiotas' }
  ];

  banear(id: number) {
    this.comentarios = this.comentarios.filter(c => c.id !== id);
  }
}