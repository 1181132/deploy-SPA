import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PercursoProcuraComponent } from './percurso-procura.component';

describe('PercursoProcuraComponent', () => {
  let component: PercursoProcuraComponent;
  let fixture: ComponentFixture<PercursoProcuraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PercursoProcuraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PercursoProcuraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
