import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registroForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private usuarioService: UsuarioService) {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: [''],
      email: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, this.passwordFuerteValidator]],
      confirmarPassword: [''],
      rol: ['USER', Validators.required]
    }, { validators: [this.matchPasswords] });
  }

  passwordFuerteValidator(control: AbstractControl): ValidationErrors | null {
    const valor = control.value;
    if (!valor) return null;

    const tieneMayuscula = /[A-Z]/.test(valor);
    const tieneMinuscula = /[a-z]/.test(valor);
    const tieneNumero = /[0-9]/.test(valor);
    const tieneSimbolo = /[!@#$%^&*(),.?":{}|<>]/.test(valor);
    const tieneLongitud = valor.length >= 8 && valor.length <= 20;

    const esValida = tieneMayuscula && tieneMinuscula && tieneNumero && tieneSimbolo && tieneLongitud;

    return esValida ? null : { passwordDebil: true };
  }

  matchPasswords(group: AbstractControl): ValidationErrors | null {
    const pass = group.get('contrasena')?.value;
    const confirm = group.get('confirmarPassword')?.value;
    return pass === confirm ? null : { passwordMismatch: true };
  }

  registrar() {
    if (this.registroForm.valid) {
      const nuevoUsuario = this.registroForm.value;
      delete nuevoUsuario.confirmarPassword;

      this.usuarioService.crearUsuario(nuevoUsuario).subscribe(
        (response) => {
          alert('Registro exitoso');
          this.router.navigate(['/foro']);
        },
        (error) => {
          console.error(error);
          alert('Error al registrarse');
        }
      );
    }
  }
}