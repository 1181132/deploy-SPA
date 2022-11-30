import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CamiaoProcuraComponent } from './camiao-procura.component';

describe('CamiaoProcuraComponent', () => {
  let component: CamiaoProcuraComponent;
  let fixture: ComponentFixture<CamiaoProcuraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CamiaoProcuraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CamiaoProcuraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
