import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeliculasAdminComponent } from './peliculas-admin.component';

describe('PeliculasAdminComponent', () => {
  let component: PeliculasAdminComponent;
  let fixture: ComponentFixture<PeliculasAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PeliculasAdminComponent]
    });
    fixture = TestBed.createComponent(PeliculasAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
