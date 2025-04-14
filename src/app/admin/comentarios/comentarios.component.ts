import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ComentarioService } from '../../services/comentario.service';

@Component({
  selector: 'app-comentarios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comentarios.component.html',
  styleUrl: './comentarios.component.css'
})
export class ComentariosComponent implements OnInit {
  comentarios: any[] = [];

  constructor(private comentarioService: ComentarioService) { }

  ngOnInit(): void {
    this.cargarComentarios();
  }

  cargarComentarios(): void {
    this.comentarioService.getTodos().subscribe({
      next: (data) => {
        this.comentarios = data.filter(c => !c.baneado); // muestra solo no baneados
      },
      error: (err) => {
        console.error('Error al cargar comentarios', err);
      }
    });
  }

  banear(id: number): void {
    const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual')!);
    if (!usuarioActual) {
      alert('Debes estar logueado para realizar esta acción.');
      return;
    }

    this.comentarioService.banearComentario(id, usuarioActual).subscribe({
      next: () => {
        this.comentarios = this.comentarios.filter(c => c.id !== id);
      },
      error: (err) => {
        console.error('Error al banear comentario', err);
      }
    });
  }
}