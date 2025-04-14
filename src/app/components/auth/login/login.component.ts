import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private usuarioService: UsuarioService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      contrasena: ['', Validators.required]
    });
  }

  get email() { return this.loginForm.get('email')!; }
  get contrasena() { return this.loginForm.get('contrasena')!; }

  iniciarSesion() {
    if (this.loginForm.valid) {
      const { email, contrasena } = this.loginForm.value;

      this.usuarioService.obtenerUsuarios().subscribe(
        (usuarios) => {
          const usuarioEncontrado = usuarios.find(u => u.email === email && u.contrasena === contrasena);

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
        },
        (error) => {
          console.error(error);
          alert('Error al iniciar sesión');
        }
      );
    }
  }
}