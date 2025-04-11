import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  get email() { return this.loginForm.get('email')!; }
  get password() { return this.loginForm.get('password')!; }

  iniciarSesion() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      // Datos simulados de usuarios
      const usuarios = [
        {
          nombre: 'Nicolás',
          email: 'nico@foro.com',
          password: '1234',
          rol: 'INVITADO'
        },
        {
          nombre: 'Admin',
          email: 'admin@foro.com',
          password: 'admin123',
          rol: 'ADMIN'
        }
      ];

      const usuarioEncontrado = usuarios.find(
        u => u.email === email && u.password === password
      );

      if (usuarioEncontrado) {
        localStorage.setItem('usuarioActual', JSON.stringify(usuarioEncontrado));
        if (usuarioEncontrado.rol === 'ADMIN') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/foro']);
        }
      } else {
        alert('Usuario o contraseña incorrectos');
      }
    }
  }
}