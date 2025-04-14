import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ComentarioService } from '../../services/comentario.service';
import { PublicacionService } from '../../services/publicacion.service';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  totalPublicaciones: number = 0;
  totalComentarios: number = 0;

  constructor(
    private publicacionService: PublicacionService,
    private comentarioService: ComentarioService
  ) {}

  ngOnInit(): void {
    this.publicacionService.obtenerTodasLasPublicaciones().subscribe(data => {
      this.totalPublicaciones = data.length;
    });

    this.comentarioService.getTodos().subscribe(data => {
      this.totalComentarios = data.length;
    });
  }
}