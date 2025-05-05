import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { UsuarioService } from '../../../services/usuario.service';
import { ProfileComponent } from './profile.component';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture;
  let mockUsuarioService: jasmine.SpyObj<UsuarioService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockUsuarioService = jasmine.createSpyObj('UsuarioService', ['obtenerUsuario', 'actualizarUsuario']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        ProfileComponent
      ],
      providers: [
        { provide: UsuarioService, useValue: mockUsuarioService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;

    const usuario = {
      id: 1,
      nombre: 'Juan',
      apellido: 'Pérez',
      email: 'juan@example.com',
      rol: 'USER',
      contrasena: 'contraseña'
    };

    localStorage.setItem('usuarioActual', JSON.stringify(usuario));

    mockUsuarioService.obtenerUsuario.and.returnValue(of(usuario));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar el formulario con los datos del usuario', () => {
    expect(component.perfilForm.get('nombre')?.value).toBe('Juan');
    expect(component.perfilForm.get('apellido')?.value).toBe('Pérez');
    expect(component.perfilForm.get('email')?.value).toBe('juan@example.com');
    expect(component.perfilForm.get('rol')?.value).toBe('USER');
  });

  it('debería guardar los cambios en el perfil', () => {
    spyOn(window, 'alert');
    mockUsuarioService.actualizarUsuario.and.returnValue(of({
      id: 1,
      nombre: 'Juanito',
      apellido: 'Pérez',
      email: 'juanito@example.com',
      rol: 'USER'
    }));

    component.perfilForm.get('nombre')?.setValue('Juanito');
    component.perfilForm.get('apellido')?.setValue('Pérez');
    component.perfilForm.get('email')?.setValue('juanito@example.com');

    component.guardarCambios();

    expect(mockUsuarioService.actualizarUsuario).toHaveBeenCalledWith(1, jasmine.objectContaining({
      nombre: 'Juanito',
      apellido: 'Pérez',
      email: 'juanito@example.com'
    }));
    expect(window.alert).toHaveBeenCalledWith('Perfil actualizado correctamente');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/foro']);
  });

  it('debería mostrar un mensaje de error si falla la actualización', () => {
    spyOn(window, 'alert');
    spyOn(console, 'error');
    mockUsuarioService.actualizarUsuario.and.returnValue(throwError(() => new Error('Error del servidor')));

    component.guardarCambios();

    expect(console.error).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Error al actualizar el perfil');
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });
});