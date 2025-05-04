import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { CrearPublicacionComponent } from '../../components/publicacion-form/publicacion-form.component';
import { PublicacionService } from '../../services/publicacion.service';

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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
