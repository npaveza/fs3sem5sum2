import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent, RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    localStorage.clear();
    jestRestoreLocationAssign();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debería cargar el usuario desde localStorage al iniciar', () => {
    const mockUsuario = { nombre: 'Juan', rol: 'USER' };
    localStorage.setItem('usuarioActual', JSON.stringify(mockUsuario));

    component.ngOnInit();

    expect(component.usuario).toEqual(mockUsuario);
  });

  it('debería eliminar el usuario y redirigir al cerrar sesión', () => {
    spyOn(component, 'redirigirALogin');
  
    localStorage.setItem('usuarioActual', JSON.stringify({ nombre: 'Ana' }));
  
    component.cerrarSesion();
  
    expect(localStorage.getItem('usuarioActual')).toBeNull();
    expect(component.redirigirALogin).toHaveBeenCalled();
  });
  

function jestSpyOnLocationAssign() {
  const original = window.location.assign;
  const spy = jasmine.createSpy('assign');
  Object.defineProperty(window.location, 'assign', {
    configurable: true,
    writable: true,
    value: spy,
  });
  (spy as any)._restore = () => {
    Object.defineProperty(window.location, 'assign', {
      configurable: true,
      writable: true,
      value: original,
    });
  };
  return spy;
}

function jestRestoreLocationAssign() {
  const current = window.location.assign as any;
  if (typeof current._restore === 'function') {
    current._restore();
  }
}
});