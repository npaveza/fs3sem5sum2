import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { PublicacionService } from '../../services/publicacion.service';
import { MisPublicacionesComponent } from './mis-publicaciones.component';

describe('MisPublicacionesComponent', () => {
  let component: MisPublicacionesComponent;
  let fixture: ComponentFixture<MisPublicacionesComponent>;
  let publicacionServiceSpy: any;

  beforeEach(async () => {
    publicacionServiceSpy = jasmine.createSpyObj('PublicacionService', ['obtenerPorAutorId']);

    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule,
        MisPublicacionesComponent
      ],
      providers: [
        { provide: PublicacionService, useValue: publicacionServiceSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MisPublicacionesComponent);
    component = fixture.componentInstance;
  });

  it('debería crear', () => {
    expect(component).toBeTruthy();
  });

  it('debería obtener publicaciones por autor id cuando el usuario está logueado', () => {
    const usuario = { id: 1, nombre: 'Juan', apellido: 'Perez', email: 'juan@example.com', rol: 'user' };
    localStorage.setItem('usuarioActual', JSON.stringify(usuario));
    component.usuario = usuario;
    publicacionServiceSpy.obtenerPorAutorId.and.returnValue(of([{ id: 1, titulo: 'Publicación 1' }]));

    fixture.detectChanges();

    expect(publicacionServiceSpy.obtenerPorAutorId).toHaveBeenCalledTimes(1);
    expect(publicacionServiceSpy.obtenerPorAutorId).toHaveBeenCalledWith(usuario.id);
    expect(component.publicaciones).toEqual([{ id: 1, titulo: 'Publicación 1' }]);
  });

  it('debería no obtener publicaciones por autor id cuando el usuario no está logueado', () => {
    localStorage.removeItem('usuarioActual');
    component.usuario = null;
    publicacionServiceSpy.obtenerPorAutorId.and.stub();

    fixture.detectChanges();

    expect(publicacionServiceSpy.obtenerPorAutorId).not.toHaveBeenCalled();
  });

  it('debería manejar error al obtener publicaciones por autor id', () => {
    const usuario = { id: 1, nombre: 'Juan', apellido: 'Perez', email: 'juan@example.com', rol: 'user' };
    localStorage.setItem('usuarioActual', JSON.stringify(usuario));
    component.usuario = usuario;
    publicacionServiceSpy.obtenerPorAutorId.and.returnValue(throwError({ status: 500 }));

    fixture.detectChanges();

    expect(publicacionServiceSpy.obtenerPorAutorId).toHaveBeenCalledTimes(1);
    expect(publicacionServiceSpy.obtenerPorAutorId).toHaveBeenCalledWith(usuario.id);
    expect(component.publicaciones).toEqual([]);
  });

  it('debería navegar a detalle de publicación', () => {
    const router = TestBed.inject(Router);
    const navigateSpy = spyOn(router, 'navigate');

    component.irADetalle(1);

    expect(navigateSpy).toHaveBeenCalledTimes(1);
    expect(navigateSpy).toHaveBeenCalledWith(['/foro', 1]);
  });
});