import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  perfilForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    const usuarioGuardado = localStorage.getItem('usuarioActual');
    const usuario = usuarioGuardado ? JSON.parse(usuarioGuardado) : null;

    this.perfilForm = this.fb.group({
      nombre: [usuario?.nombre || '', Validators.required],
      email: [usuario?.email || '', [Validators.required, Validators.email]],
      rol: [{ value: usuario?.rol || 'INVITADO', disabled: true }]
    });
  }

  guardarCambios() {
    if (this.perfilForm.valid) {
      const datosActualizados = this.perfilForm.getRawValue();
      const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual')!);

      const actualizado = {
        ...usuarioActual,
        ...datosActualizados
      };

      localStorage.setItem('usuarioActual', JSON.stringify(actualizado));
      alert('Perfil actualizado correctamente');
      this.router.navigate(['/foro']);
    }
  }
}