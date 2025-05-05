import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { UsuarioService } from '../../../services/usuario.service';
import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let mockUsuarioService: jasmine.SpyObj<UsuarioService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockUsuarioService = jasmine.createSpyObj('UsuarioService', ['crearUsuario']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        RegisterComponent,
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: UsuarioService, useValue: mockUsuarioService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debería marcar el formulario como inválido si faltan campos requeridos', () => {
    component.registroForm.setValue({
      nombre: '',
      apellido: '',
      email: '',
      contrasena: '',
      confirmarPassword: '',
      rol: ''
    });
    expect(component.registroForm.invalid).toBeTrue();
  });

  it('debería marcar error si las contraseñas no coinciden', () => {
    component.registroForm.setValue({
      nombre: 'Juan',
      apellido: 'Test',
      email: 'juan@test.com',
      contrasena: 'Test123!',
      confirmarPassword: 'OtraClave123!',
      rol: 'USER'
    });
    const errors = component.registroForm.errors;
    expect(errors).toEqual(jasmine.objectContaining({ passwordMismatch: true }));
  });

  it('debería registrar usuario y redirigir si el formulario es válido', fakeAsync(() => {
    spyOn(window, 'alert');
    mockUsuarioService.crearUsuario.and.returnValue(of({
      id: 1,
      nombre: 'Ana',
      apellido: 'Gómez',
      email: 'ana@test.com',
      rol: 'USER'
    }));
    component.registroForm.setValue({
      nombre: 'Ana',
      apellido: 'Gómez',
      email: 'ana@test.com',
      contrasena: 'Strong123!',
      confirmarPassword: 'Strong123!',
      rol: 'USER'
    });
    component.registrar();
    tick();
    expect(mockUsuarioService.crearUsuario).toHaveBeenCalledWith(jasmine.objectContaining({
      nombre: 'Ana',
      apellido: 'Gómez',
      email: 'ana@test.com',
      contrasena: 'Strong123!',
      rol: 'USER'
    }));
    expect(window.alert).toHaveBeenCalledWith('Registro exitoso');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/foro']);
  }));

  it('debería mostrar mensaje de error si el registro falla', fakeAsync(() => {
    spyOn(window, 'alert');
    spyOn(console, 'error');
    mockUsuarioService.crearUsuario.and.returnValue(throwError(() => new Error('Error del servidor')));
    component.registroForm.setValue({
      nombre: 'Ana',
      apellido: 'Gómez',
      email: 'ana@test.com',
      contrasena: 'Strong123!',
      confirmarPassword: 'Strong123!',
      rol: 'USER'
    });
    component.registrar();
    tick();
    expect(console.error).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Error al registrarse');
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  }));
});