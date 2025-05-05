import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { PublicacionService } from '../../services/publicacion.service';
import { ForoComponent } from './foro.component';

describe('ForoComponent', () => {
  let component: ForoComponent;
  let fixture: ComponentFixture<ForoComponent>;
  let publicacionServiceSpy: any;

  beforeEach(async () => {
    publicacionServiceSpy = jasmine.createSpyObj('PublicacionService', ['obtenerTodasLasPublicaciones']);

    await TestBed.configureTestingModule({
      imports: [ForoComponent, HttpClientModule, RouterTestingModule],
      providers: [
        { provide: PublicacionService, useValue: publicacionServiceSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should obtener todas las publicaciones', () => {
    const publicaciones = [
      { id: 1, titulo: 'Publicación 1', autor: { nombre: 'Juan' } }
    ];
    publicacionServiceSpy.obtenerTodasLasPublicaciones.and.returnValue(of(publicaciones));

    fixture.detectChanges();

    expect(publicacionServiceSpy.obtenerTodasLasPublicaciones).toHaveBeenCalledTimes(1);
    expect(component.publicaciones).toEqual(publicaciones);
  });

  it('should manejar error al obtener publicaciones', () => {
    publicacionServiceSpy.obtenerTodasLasPublicaciones.and.returnValue(throwError({ status: 500 }));

    fixture.detectChanges();

    expect(publicacionServiceSpy.obtenerTodasLasPublicaciones).toHaveBeenCalledTimes(1);
    expect(component.publicaciones).toEqual([]);
  });
});