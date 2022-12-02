import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntregaProcuraComponent } from './entrega-procura.component';

describe('EntregaProcuraComponent', () => {
  let component: EntregaProcuraComponent;
  let fixture: ComponentFixture<EntregaProcuraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntregaProcuraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntregaProcuraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
