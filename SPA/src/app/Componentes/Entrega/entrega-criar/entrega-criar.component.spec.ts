import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntregaCriarComponent } from './entrega-criar.component';

describe('EntregaCriarComponent', () => {
  let component: EntregaCriarComponent;
  let fixture: ComponentFixture<EntregaCriarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntregaCriarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntregaCriarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
