import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CamiaoCriarComponent } from './camiao-criar.component';

describe('CamiaoCriarComponent', () => {
  let component: CamiaoCriarComponent;
  let fixture: ComponentFixture<CamiaoCriarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CamiaoCriarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CamiaoCriarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
