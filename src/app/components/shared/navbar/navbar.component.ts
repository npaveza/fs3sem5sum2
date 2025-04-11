import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [RouterModule, NavbarComponent, CommonModule]
})
export class NavbarComponent implements OnInit {
  usuario: any = null;

  ngOnInit(): void {
    const usuarioActual = localStorage.getItem('usuarioActual');
    if (usuarioActual) {
      this.usuario = JSON.parse(usuarioActual);
    }
  }

  cerrarSesion() {
    localStorage.removeItem('usuarioActual');
    window.location.href = '/login'; // O usa: this.router.navigate(['/login']);
  }
}