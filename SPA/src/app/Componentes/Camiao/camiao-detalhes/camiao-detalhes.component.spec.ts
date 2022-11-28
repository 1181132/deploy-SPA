import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CamiaoDetalhesComponent } from './camiao-detalhes.component';

describe('CamiaoDetalhesComponent', () => {
  let component: CamiaoDetalhesComponent;
  let fixture: ComponentFixture<CamiaoDetalhesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CamiaoDetalhesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CamiaoDetalhesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
