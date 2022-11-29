import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PercursoCriarComponent } from './percurso-criar.component';

describe('PercursoCriarComponent', () => {
  let component: PercursoCriarComponent;
  let fixture: ComponentFixture<PercursoCriarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PercursoCriarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PercursoCriarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
