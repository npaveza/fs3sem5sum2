import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.css'
})
export class PostDetailComponent {
  publicacion: any;
  comentarios: any[] = [];
  comentarioForm: FormGroup;

  constructor(private route: ActivatedRoute, private fb: FormBuilder) {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    // Simular datos de publicaciones (mismos que en ForoComponent)
    const publicaciones = [
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

    this.publicacion = publicaciones.find(p => p.id === id);

    // Comentarios simulados por publicación
    this.comentarios = [
      { autor: 'usuario1', mensaje: '¡Me encanta Hollow Knight!' },
      { autor: 'usuario2', mensaje: 'FFXIV para siempre 💕' }
    ];

    this.comentarioForm = this.fb.group({
      mensaje: ['', Validators.required]
    });
  }

  agregarComentario() {
    if (this.comentarioForm.valid) {
      const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual')!);
      const comentario = {
        autor: usuarioActual?.nombre || 'Anónimo',
        mensaje: this.comentarioForm.value.mensaje
      };

      this.comentarios.push(comentario);
      this.comentarioForm.reset();
    }
  }
}