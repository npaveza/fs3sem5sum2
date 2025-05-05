// Archivo: dashboard.component.spec.ts
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ComentarioService } from '../../services/comentario.service';
import { PublicacionService } from '../../services/publicacion.service';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let comentarioServiceSpy: jasmine.SpyObj<ComentarioService>;
  let publicacionServiceSpy: jasmine.SpyObj<PublicacionService>;

  beforeEach(async () => {
    // Crear spies para los servicios
    comentarioServiceSpy = jasmine.createSpyObj('ComentarioService', ['getTodos']);
    publicacionServiceSpy = jasmine.createSpyObj('PublicacionService', ['obtenerTodasLasPublicaciones']);
    
    // Configurar los valores de retorno para los métodos espiados
    comentarioServiceSpy.getTodos.and.returnValue({ subscribe: (fn: any) => fn([{}, {}, {}]) } as any);
    publicacionServiceSpy.obtenerTodasLasPublicaciones.and.returnValue({ subscribe: (fn: any) => fn([{}, {}]) } as any);

    await TestBed.configureTestingModule({
      imports: [
        DashboardComponent,
        HttpClientTestingModule,
        RouterTestingModule  // Añadimos RouterTestingModule
      ],
      providers: [
        { provide: ComentarioService, useValue: comentarioServiceSpy },
        { provide: PublicacionService, useValue: publicacionServiceSpy }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Añadimos pruebas para mejorar la cobertura
  it('debería mostrar el número de publicaciones', () => {
    expect(component.totalPublicaciones).toBe(2);
    expect(publicacionServiceSpy.obtenerTodasLasPublicaciones).toHaveBeenCalled();
  });

  it('debería mostrar el número de comentarios', () => {
    expect(component.totalComentarios).toBe(3);
    expect(comentarioServiceSpy.getTodos).toHaveBeenCalled();
  });
});