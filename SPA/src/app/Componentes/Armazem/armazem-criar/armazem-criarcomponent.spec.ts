import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArmazemCriarComponent } from './armazem-criarcomponent';

describe('ArmazemFormularioComponent', () => {
  let component: ArmazemCriarComponent;
  let fixture: ComponentFixture<ArmazemCriarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArmazemCriarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArmazemCriarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
