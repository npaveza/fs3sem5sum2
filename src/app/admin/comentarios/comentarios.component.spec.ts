import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { ComentarioService } from '../../services/comentario.service';
import { ComentariosComponent } from './comentarios.component';

describe('ComentariosComponent', () => {
  let component: ComentariosComponent;
  let fixture: ComponentFixture<ComentariosComponent>;
  let mockComentarioService: jasmine.SpyObj<ComentarioService>;

  beforeEach(async () => {
    mockComentarioService = jasmine.createSpyObj('ComentarioService', ['getTodos', 'banearComentario']);
    mockComentarioService.getTodos.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      imports: [ComentariosComponent],
      providers: [
        { provide: ComentarioService, useValue: mockComentarioService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ComentariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debería cargar comentarios', () => {
    const comentarios = [
      { id: 1, contenido: 'Comentario 1', baneado: false },
      { id: 2, contenido: 'Comentario 2', baneado: false }
    ];
  
    mockComentarioService.getTodos.and.returnValue(of(comentarios));
    mockComentarioService.getTodos.calls.reset();
  
    component.cargarComentarios();
  
    expect(mockComentarioService.getTodos).toHaveBeenCalledTimes(1);
    expect(component.comentarios).toEqual(comentarios);
  });

  it('debería banear comentario', () => {
    const usuarioActual = { id: 1, nombre: 'Juan' };
    localStorage.setItem('usuarioActual', JSON.stringify(usuarioActual));

    const comentario = { id: 1, contenido: 'Comentario 1', baneado: false };
    component.comentarios = [comentario];

    mockComentarioService.banearComentario.and.returnValue(of({}));

    component.banear(comentario.id);

    expect(mockComentarioService.banearComentario).toHaveBeenCalledTimes(1);
    expect(mockComentarioService.banearComentario).toHaveBeenCalledWith(comentario.id, usuarioActual);
    expect(component.comentarios).toEqual([]);
  });

  it('debería mostrar mensaje de error si no está logueado', () => {
    spyOn(window, 'alert');
    localStorage.removeItem('usuarioActual');

    component.banear(1);

    expect(window.alert).toHaveBeenCalledWith('Debes estar logueado para realizar esta acción.');
  });

  it('debería mostrar error al cargar comentarios', () => {
    spyOn(console, 'error');
    mockComentarioService.getTodos.and.returnValue(throwError(() => new Error('Error del servidor')));

    component.cargarComentarios();

    expect(console.error).toHaveBeenCalledWith('Error al cargar comentarios', jasmine.any(Error));
  });

  it('debería mostrar error al banear comentario', () => {
    spyOn(console, 'error');
    const usuarioActual = { id: 1, nombre: 'Juan' };
    localStorage.setItem('usuarioActual', JSON.stringify(usuarioActual));

    mockComentarioService.banearComentario.and.returnValue(throwError(() => new Error('Error del servidor')));

    component.banear(1);

    expect(console.error).toHaveBeenCalledWith('Error al banear comentario', jasmine.any(Error));
  });
});