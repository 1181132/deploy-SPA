import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PercursoDetalhesComponent } from './percurso-detalhes.component';

describe('PercursoDetalhesComponent', () => {
  let component: PercursoDetalhesComponent;
  let fixture: ComponentFixture<PercursoDetalhesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PercursoDetalhesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PercursoDetalhesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
