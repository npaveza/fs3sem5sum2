import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PublicacionService } from '../../services/publicacion.service';

@Component({
  selector: 'app-foro',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './foro.component.html',
  styleUrls: ['./foro.component.css']
})
export class ForoComponent implements OnInit {
  publicaciones: any[] = [];

  constructor(private publicacionService: PublicacionService) { }

  ngOnInit(): void {
    this.publicacionService.obtenerTodasLasPublicaciones().subscribe((publicaciones: any) => {
      this.publicaciones = publicaciones as any[];
    });
  }
}