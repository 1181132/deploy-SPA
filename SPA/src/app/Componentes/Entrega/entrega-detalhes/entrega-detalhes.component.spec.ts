import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntregaDetalhesComponent } from './entrega-detalhes.component';

describe('EntregaDetalhesComponent', () => {
  let component: EntregaDetalhesComponent;
  let fixture: ComponentFixture<EntregaDetalhesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntregaDetalhesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntregaDetalhesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
