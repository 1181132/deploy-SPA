import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreejsTestComponent } from './rede-viaria.component';

describe('ThreejsTestComponent', () => {
  let component: ThreejsTestComponent;
  let fixture: ComponentFixture<ThreejsTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThreejsTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThreejsTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
