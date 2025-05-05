import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { PublicacionService } from '../../services/publicacion.service';
import { CrearPublicacionComponent } from './publicacion-form.component';

describe('CrearPublicacionComponent', () => {
  let component: CrearPublicacionComponent;
  let fixture: ComponentFixture<CrearPublicacionComponent>;

  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };

  const mockPublicacionService = {
    crearPublicacion: jasmine.createSpy('crearPublicacion').and.returnValue(of({}))
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearPublicacionComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: PublicacionService, useValue: mockPublicacionService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CrearPublicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    localStorage.clear();
    mockRouter.navigate.calls.reset();
    mockPublicacionService.crearPublicacion.calls.reset();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debería alertar y redirigir al login si no hay usuario autenticado', () => {
    spyOn(window, 'alert');

    localStorage.removeItem('usuarioActual');

    component.crearPublicacion();

    expect(window.alert).toHaveBeenCalledWith('Debes iniciar sesión para publicar.');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
    expect(mockPublicacionService.crearPublicacion).not.toHaveBeenCalled();
  });

  it('debería crear publicación y redirigir si hay usuario autenticado', () => {
    spyOn(window, 'alert');
  
    const usuarioMock = {
      id: 1,
      nombre: 'Juan',
      apellido: 'Pérez',
      email: 'juan@test.com',
      rol: 'USER',
      contrasena: '1234'
    };
    localStorage.setItem('usuarioActual', JSON.stringify(usuarioMock));
  
    component.publicacion.titulo = 'Título de prueba';
    component.publicacion.contenido = 'Contenido de prueba';
  
    // 🔧 Nos aseguramos de que devuelva un observable exitoso
    mockPublicacionService.crearPublicacion.and.returnValue(of({}));
  
    component.crearPublicacion();
  
    expect(component.publicacion.autor).toEqual(usuarioMock);
    expect(mockPublicacionService.crearPublicacion).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Publicación creada exitosamente');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/publicaciones']);
  });
  

  it('debería mostrar error si falla la creación de la publicación', () => {
    spyOn(window, 'alert');
    spyOn(console, 'error');

    const usuarioMock = {
      id: 2,
      nombre: 'Ana',
      apellido: 'Gómez',
      email: 'ana@test.com',
      rol: 'ADMIN',
      contrasena: 'abcd'
    };
    localStorage.setItem('usuarioActual', JSON.stringify(usuarioMock));

    mockPublicacionService.crearPublicacion.and.returnValue(throwError(() => new Error('Error al crear')));

    component.publicacion.titulo = 'Título de error';
    component.publicacion.contenido = 'Contenido con error';

    component.crearPublicacion();

    expect(console.error).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Error al crear publicación');
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });
});
