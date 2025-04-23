import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeliculasSalasFormComponent } from './peliculas-salas-form.component';

describe('PeliculasSalasFormComponent', () => {
  let component: PeliculasSalasFormComponent;
  let fixture: ComponentFixture<PeliculasSalasFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PeliculasSalasFormComponent]
    });
    fixture = TestBed.createComponent(PeliculasSalasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
