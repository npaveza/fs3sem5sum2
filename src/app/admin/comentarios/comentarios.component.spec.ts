import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ComentariosComponent } from './comentarios.component';

describe('ComentariosComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ComentariosComponent
      ]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ComentariosComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
