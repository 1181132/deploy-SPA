import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PercursoListarComponent } from './percurso-listar.component';

describe('PercursoListarComponent', () => {
  let component: PercursoListarComponent;
  let fixture: ComponentFixture<PercursoListarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PercursoListarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PercursoListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
