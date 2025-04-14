import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ComentarioService } from '../../../services/comentario.service';
import { PublicacionService } from '../../../services/publicacion.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule]
})
export class PostDetailComponent implements OnInit {
  publicacion: any;
  comentarios: any[] = [];
  comentarioForm = new FormGroup({
    contenido: new FormControl('')
  });

  // Este es un usuario temporal de prueba
  usuarioActual = { id: 1 };

  constructor(
    private route: ActivatedRoute,
    private publicacionService: PublicacionService,
    private comentarioService: ComentarioService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.publicacionService.obtenerPublicacionPorId(id).subscribe((publicacion: any) => {
      this.publicacion = publicacion;
      this.obtenerComentarios();
    });
  }

  obtenerComentarios() {
    this.comentarioService
      .obtenerComentariosPorPublicacion(this.publicacion.id)
      .subscribe((comentarios: any) => {
        this.comentarios = comentarios;
      });
  }

  agregarComentario() {
    if (!this.usuarioActual?.id || !this.publicacion?.id) {
      console.error('Falta usuarioActual o publicación');
      return;
    }

    const comentario = {
      contenido: this.comentarioForm.value.contenido,
      autor: { id: this.usuarioActual.id },
      publicacion: { id: this.publicacion.id }
    };

    this.comentarioService.agregarComentario(comentario).subscribe((comentarioAgregado: any) => {
      this.comentarios.push(comentarioAgregado);
      this.comentarioForm.reset();
    });
  }
}