import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ArmazemProcuraComponent } from '../armazem-procura/armazem-procura.component';
import { ArmazemService } from '../../../Servicos/Armazens/armazem.service';
import { Armazem } from '../../../Modelos/armazem';

import { ArmazemListarComponent } from './armazem-listar.component';

describe('DashboardComponent', () => {
  let component: ArmazemListarComponent;
  let fixture: ComponentFixture<ArmazemListarComponent>;
  let armazemService;
  let getArmazemSpy: jasmine.Spy;

  beforeEach(waitForAsync(() => {
    armazemService = jasmine.createSpyObj('ArmazemService', ['getArmazens']);
    getArmazemSpy = armazemService.getArmazens.and.returnValue(of('ARMAZEM'));
    TestBed
        .configureTestingModule({
          declarations: [ArmazemListarComponent, ArmazemProcuraComponent],
          imports: [RouterTestingModule.withRoutes([])],
          providers: [{provide: ArmazemService, useValue: armazemService}]
        })
        .compileComponents();

    fixture = TestBed.createComponent(ArmazemListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display "Todos os Armazens" as headline', () => {
    expect(fixture.nativeElement.querySelector('h2').textContent).toEqual('Todos os Armazens');
  });

  it('should call armzemService', waitForAsync(() => {
       expect(getArmazemSpy.calls.any()).toBe(true);
     }));

  it('should display 4 links', waitForAsync(() => {
       expect(fixture.nativeElement.querySelectorAll('a').length).toEqual(4);
     }));
});