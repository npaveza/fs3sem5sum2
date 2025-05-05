import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { UsuarioService } from '../../../services/usuario.service';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockUsuarioService: jasmine.SpyObj<UsuarioService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockUsuarioService = jasmine.createSpyObj('UsuarioService', ['obtenerUsuarios']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [LoginComponent, HttpClientTestingModule, ReactiveFormsModule],
      providers: [
        { provide: UsuarioService, useValue: mockUsuarioService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debería marcar el formulario como inválido si faltan campos requeridos', () => {
    component.loginForm.setValue({
      email: '',
      contrasena: ''
    });
    expect(component.loginForm.invalid).toBeTrue();
  });

  it('debería iniciar sesión correctamente', () => {
    spyOn(window, 'alert');
    mockUsuarioService.obtenerUsuarios.and.returnValue(of([
      { id: 1, nombre: 'Juan', email: 'juan@example.com', contrasena: 'contraseña', rol: 'USER' }
    ]));

    component.loginForm.setValue({
      email: 'juan@example.com',
      contrasena: 'contraseña'
    });

    component.iniciarSesion();

    expect(mockUsuarioService.obtenerUsuarios).toHaveBeenCalledTimes(1);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/foro']);
  });

  it('debería redirigir a admin si el usuario es admin', () => {
    spyOn(window, 'alert');
    mockUsuarioService.obtenerUsuarios.and.returnValue(of([
      { id: 1, nombre: 'Admin', email: 'admin@example.com', contrasena: 'contraseña', rol: 'ADMIN' }
    ]));

    component.loginForm.setValue({
      email: 'admin@example.com',
      contrasena: 'contraseña'
    });

    component.iniciarSesion();

    expect(mockUsuarioService.obtenerUsuarios).toHaveBeenCalledTimes(1);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/admin']);
  });

  it('debería mostrar un mensaje de error si las credenciales son incorrectas', () => {
    spyOn(window, 'alert');
    mockUsuarioService.obtenerUsuarios.and.returnValue(of([
      { id: 1, nombre: 'Juan', email: 'juan@example.com', contrasena: 'contraseña', rol: 'USER' }
    ]));

    component.loginForm.setValue({
      email: 'juan@example.com',
      contrasena: 'contraseñaIncorrecta'
    });

    component.iniciarSesion();

    expect(window.alert).toHaveBeenCalledWith('Usuario o contraseña incorrectos');
  });

  it('debería mostrar un mensaje de error si falla la obtención de usuarios', () => {
    spyOn(window, 'alert');
    spyOn(console, 'error');
    mockUsuarioService.obtenerUsuarios.and.returnValue(throwError(() => new Error('Error del servidor')));

    component.loginForm.setValue({
      email: 'juan@example.com',
      contrasena: 'contraseña'
    });

    component.iniciarSesion();

    expect(console.error).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Error al iniciar sesión');
  });
});