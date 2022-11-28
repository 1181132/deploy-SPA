import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CamiaoListarComponent } from './camiao-listar.component';

describe('CamiaoListarComponent', () => {
  let component: CamiaoListarComponent;
  let fixture: ComponentFixture<CamiaoListarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CamiaoListarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CamiaoListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
