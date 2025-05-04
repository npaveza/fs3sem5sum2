import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { Publicacion } from '../../models/publicacion.model';
import { Usuario } from '../../models/usuario.model';
import { PublicacionService } from '../../services/publicacion.service';
import { PublicacionesComponent } from './publicaciones.component';

describe('PublicacionesComponent', () => {
  let component: PublicacionesComponent;
  let fixture: ComponentFixture<PublicacionesComponent>;
  let publicacionServiceSpy: jasmine.SpyObj<PublicacionService>;

  const mockUsuario: Usuario = {
    id: 1,
    nombre: 'Juan',
    apellido: 'Pérez',
    email: 'juan@example.com',
    rol: 'USER',
    contrasena: 'secreta123'
  };

  const mockPublicaciones: Publicacion[] = [
    { titulo: 'Título 1', contenido: 'Contenido 1', autor: mockUsuario },
    { titulo: 'Título 2', contenido: 'Contenido 2', autor: mockUsuario }
  ];

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('PublicacionService', ['obtenerTodasLasPublicaciones', 'banearPublicacion']);

    await TestBed.configureTestingModule({
      imports: [PublicacionesComponent, HttpClientTestingModule],
      providers: [
        { provide: PublicacionService, useValue: spy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PublicacionesComponent);
    component = fixture.componentInstance;
    publicacionServiceSpy = TestBed.inject(PublicacionService) as jasmine.SpyObj<PublicacionService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debería cargar publicaciones al iniciar', () => {
    publicacionServiceSpy.obtenerTodasLasPublicaciones.and.returnValue(of(mockPublicaciones));

    component.ngOnInit();

    expect(publicacionServiceSpy.obtenerTodasLasPublicaciones).toHaveBeenCalled();
    expect(component.publicaciones.length).toBe(2);
    expect(component.publicaciones[0].contenido).toBe('Contenido 1');
  });

  it('debería llamar a banear y recargar publicaciones', () => {
    publicacionServiceSpy.banearPublicacion.and.returnValue(of(void 0));
    publicacionServiceSpy.obtenerTodasLasPublicaciones.and.returnValue(of(mockPublicaciones));

    component.banear(1);

    expect(publicacionServiceSpy.banearPublicacion).toHaveBeenCalledWith(1, jasmine.any(Object));
    expect(publicacionServiceSpy.obtenerTodasLasPublicaciones).toHaveBeenCalled();
  });
});
