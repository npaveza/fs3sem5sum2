import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('debería devolver null si no hay usuario autenticado', () => {
    expect(service.getUsuarioActual()).toBeNull();
  });

  it('debería devolver el usuario autenticado', () => {
    const usuario = { id: 1, nombre: 'Juan' };
    localStorage.setItem('usuarioActual', JSON.stringify(usuario));

    expect(service.getUsuarioActual()).toEqual(usuario);
  });

  it('debería indicar que el usuario no está autenticado', () => {
    expect(service.estaAutenticado()).toBeFalse();
  });

  it('debería indicar que el usuario está autenticado', () => {
    const usuario = { id: 1, nombre: 'Juan' };
    localStorage.setItem('usuarioActual', JSON.stringify(usuario));

    expect(service.estaAutenticado()).toBeTrue();
  });

  it('debería cerrar la sesión del usuario', () => {
    const usuario = { id: 1, nombre: 'Juan' };
    localStorage.setItem('usuarioActual', JSON.stringify(usuario));

    service.cerrarSesion();

    expect(localStorage.getItem('usuarioActual')).toBeNull();
    expect(service.estaAutenticado()).toBeFalse();
  });
});