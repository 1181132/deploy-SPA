import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArmazemDetalhosComponent } from '../armazem-detalhos/armazem-detalhos.component';

describe('ArmazemFormularioComponent', () => {
  let component: ArmazemDetalhosComponent;
  let fixture: ComponentFixture<ArmazemDetalhosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArmazemDetalhosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArmazemDetalhosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
