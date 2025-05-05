import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { UsuarioService } from './usuario.service';

describe('UsuarioService', () => {
    let service: UsuarioService;
    let httpMock: HttpTestingController;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [UsuarioService]
        });
        service = TestBed.inject(UsuarioService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('debería obtener usuarios', () => {
        const usuarios = [
            { id: 1, nombre: 'Juan', apellido: 'Pérez', email: 'juan@example.com', rol: 'USER' },
            { id: 2, nombre: 'Pedro', apellido: 'García', email: 'pedro@example.com', rol: 'ADMIN' }
        ];

        service.obtenerUsuarios().subscribe((data) => {
            expect(data).toEqual(usuarios);
        });

        const req = httpMock.expectOne('http://localhost:8080/api/usuarios');
        expect(req.request.method).toBe('GET');
        req.flush(usuarios);
    });

    it('debería obtener un usuario por ID', () => {
        const usuario = { id: 1, nombre: 'Juan', apellido: 'Pérez', email: 'juan@example.com', rol: 'USER' };

        service.obtenerUsuario(1).subscribe((data) => {
            expect(data).toEqual(usuario);
        });

        const req = httpMock.expectOne('http://localhost:8080/api/usuarios/1');
        expect(req.request.method).toBe('GET');
        req.flush(usuario);
    });

    it('debería crear un nuevo usuario', () => {
        const usuario = { id: 1, nombre: 'Juan', apellido: 'Pérez', email: 'juan@example.com', rol: 'USER' };

        service.crearUsuario(usuario).subscribe((data) => {
            expect(data).toEqual(usuario);
        });

        const req = httpMock.expectOne('http://localhost:8080/api/usuarios');
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual(usuario);
        req.flush(usuario);
    });

    it('debería actualizar un usuario', () => {
        const usuario = { id: 1, nombre: 'Juan', apellido: 'Pérez', email: 'juan@example.com', rol: 'USER' };

        service.actualizarUsuario(1, usuario).subscribe((data) => {
            expect(data).toEqual(usuario);
        });

        const req = httpMock.expectOne('http://localhost:8080/api/usuarios/1');
        expect(req.request.method).toBe('PUT');
        expect(req.request.body).toEqual(usuario);
        req.flush(usuario);
    });

    it('debería eliminar un usuario', () => {
        service.eliminarUsuario(1).subscribe(() => {
            expect(true).toBeTrue();
        });

        const req = httpMock.expectOne('http://localhost:8080/api/usuarios/1');
        expect(req.request.method).toBe('DELETE');
        req.flush({});
    });
});