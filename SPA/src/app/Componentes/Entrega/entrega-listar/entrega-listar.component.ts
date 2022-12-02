import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Entrega } from '../../../Modelos/entrega';
import { EntregaService } from 'src/app/Servicos/Entregas/entrega.service';

@Component({
  selector: 'app-entrega-listar',
  templateUrl: './entrega-listar.component.html',
  styleUrls: ['./entrega-listar.component.css']
})
export class EntregaListarComponent implements OnInit{
  entregas: Entrega[] = [];

  constructor(private htppClient: HttpClient, private entregaService: EntregaService) { }

  ngOnInit(): void {
    this.getEntregas();
  }

  getEntregas(): void {
    this.entregaService.getEntregas()
      .subscribe((entregas: Entrega[]) => this.entregas = entregas);
  }
  
   delete(entrega: Entrega): void {
    this.entregas = this.entregas.filter(h => h !== entrega);
    this.entregaService.deleteEntrega(entrega.id).subscribe();
  } 

}
