import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario, UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  perfilForm!: FormGroup;
  usuarioActual!: Usuario;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    const usuarioGuardado = localStorage.getItem('usuarioActual');
    if (usuarioGuardado) {
      const usuario = JSON.parse(usuarioGuardado);
      const id = usuario.id;

      this.usuarioService.obtenerUsuario(id).subscribe((res: Usuario) => {
        this.usuarioActual = res;

        this.perfilForm = this.fb.group({
          nombre: [res.nombre, Validators.required],
          apellido: [res.apellido],
          email: [res.email, [Validators.required, Validators.email]],
          rol: [{ value: res.rol, disabled: true }],
          contrasena: ['']
        });
      });
    }
  }

  guardarCambios() {
    if (this.perfilForm.valid) {
      const cambios = this.perfilForm.getRawValue();
      const usuarioActualizado: Usuario = {
        ...this.usuarioActual,
        nombre: cambios.nombre,
        apellido: cambios.apellido,
        email: cambios.email
      };

      if (cambios.contrasena) {
        usuarioActualizado.contrasena = cambios.contrasena;
      }

      this.usuarioService.actualizarUsuario(this.usuarioActual.id, usuarioActualizado).subscribe((res: Usuario) => {
        localStorage.setItem('usuarioActual', JSON.stringify(res));
        alert('Perfil actualizado correctamente');
        this.router.navigate(['/foro']);
      }, error => {
        console.error(error);
        alert('Error al actualizar el perfil');
      });
    }
  }
}