import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { EntregaProcuraComponent } from '../entrega-procura/entrega-procura.component';
import { EntregaService } from '../../../Servicos/Entregas/entrega.service';
import { Entrega } from '../../../Modelos/entrega';


import { EntregaListarComponent } from './entrega-listar.component';


describe('EntregaListarComponent', () => {
  let component: EntregaListarComponent;
  let fixture: ComponentFixture<EntregaListarComponent>;
  let entregaService; //:EntregaService;
  let getEntregaSpy: jasmine.Spy;

  beforeEach(waitForAsync (() => {
    entregaService = jasmine.createSpyObj('EntregaService',
    ['getEntregas']);
    getEntregaSpy = entregaService.getEntregas.and.returnValue(of
      ('ENTREGA'));
    TestBed
    .configureTestingModule({
      declarations: [ EntregaListarComponent,
      EntregaProcuraComponent ],
      imports: [ RouterTestingModule.withRoutes([])],
      providers: [{provide: EntregaService, useValue:
      entregaService}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntregaListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display "Todos as Entregas" as headline', () => {
    expect(fixture.nativeElement.querySelector('h2').textContent).toEqual('Todas as Entregas');
  });

  it('should call entregaService', waitForAsync(() => {
       expect(getEntregaSpy.calls.any()).toBe(true);
     }));

  it('should display 4 links', waitForAsync(() => {
       expect(fixture.nativeElement.querySelectorAll('a').length).toEqual(4);
     }));
});
