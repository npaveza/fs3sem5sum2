import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ComentarioService } from './comentario.service';

describe('ComentarioService', () => {
  let service: ComentarioService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:8080/api/comentarios';

  // Datos mock para pruebas
  const mockComentarios = [
    { id: 1, texto: 'Comentario 1', publicacionId: 1, usuario: 'usuario1' },
    { id: 2, texto: 'Comentario 2', publicacionId: 1, usuario: 'usuario2' }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ComentarioService]
    });
    
    service = TestBed.inject(ComentarioService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('obtenerComentariosPorPublicacion', () => {
    it('should return comentarios for a specific publicacion', () => {
      const publicacionId = 1;
      
      service.obtenerComentariosPorPublicacion(publicacionId).subscribe(data => {
        expect(data).toEqual(mockComentarios);
      });

      const req = httpMock.expectOne(`${apiUrl}/publicacion/${publicacionId}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockComentarios);
    });
  });

  describe('agregarComentario', () => {
    it('should add a new comentario', () => {
      const newComentario = { texto: 'Nuevo comentario', publicacionId: 1, usuario: 'usuario3' };
      const resultComentario = { id: 3, ...newComentario };
      
      service.agregarComentario(newComentario).subscribe(data => {
        expect(data).toEqual(resultComentario);
      });

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(newComentario);
      req.flush(resultComentario);
    });
  });

  describe('banearComentario', () => {
    it('should ban a comentario', () => {
      const comentarioId = 1;
      const usuario = { id: 'admin1', nombre: 'Administrador' };
      const expectedResult = { success: true, message: 'Comentario baneado' };
      
      service.banearComentario(comentarioId, usuario).subscribe(data => {
        expect(data).toEqual(expectedResult);
      });

      const req = httpMock.expectOne(`${apiUrl}/${comentarioId}/banear`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(usuario);
      req.flush(expectedResult);
    });
  });

  describe('getTodos', () => {
    it('should return all comentarios', () => {
      service.getTodos().subscribe(data => {
        expect(data).toEqual(mockComentarios);
        expect(data.length).toBe(2);
      });

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('GET');
      req.flush(mockComentarios);
    });
  });

  describe('error handling', () => {
    it('should handle error when fetching comentarios', () => {
      service.getTodos().subscribe({
        next: () => fail('should have failed with 404 error'),
        error: (error) => {
          expect(error.status).toBe(404);
        }
      });

      const req = httpMock.expectOne(apiUrl);
      req.flush('Not found', { status: 404, statusText: 'Not Found' });
    });
  });
});