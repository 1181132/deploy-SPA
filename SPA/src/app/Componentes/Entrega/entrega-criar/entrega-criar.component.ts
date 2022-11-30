import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Entrega } from '../../../Modelos/entrega';
import { EntregaService } from 'src/app/Servicos/Entregas/entrega.service';
import { __values } from 'tslib';

@Component({
  selector: 'app-entrega-criar',
  templateUrl: './entrega-criar.component.html',
  styleUrls: ['./entrega-criar.component.css']
})
export class EntregaCriarComponent implements OnInit{
  entregas: Entrega[] =[];

  constructor(private entregaService: EntregaService){

  }

  entregaForm!: FormGroup;

  ngOnInit(): void {
    this.entregaForm = new FormGroup({
      entregaId: new FormControl('', [
        Validators.required,
        Validators.min(1)
      ]),
      entregaData: new FormControl('', [
        Validators.required,
        Validators.pattern("(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)")
      ]),
      entregaMassa: new FormControl('', [
        Validators.required,
        Validators.min(1)
      ]),
      entregaArmazemId: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z0-9]{3}'),
        Validators.maxLength(3)
      ]),
      entregaTempoColocarEntrega: new FormControl('', [
        Validators.required,
        Validators.min(1)
      ]),
      entregaTempoRetirarEntrega: new FormControl('', [
        Validators.required,
        Validators.min(1)
      ])
    })
    
  }

  get entregaId(){
    return this.entregaForm.get('entregaId')!;
  }

  get entregaData(){
    return this.entregaForm.get('entregaData')!;
  }

  get entregaMassa(){
    return this.entregaForm.get('entregaMassa')!;
  }

  get entregaArmazemId(){
    return this.entregaForm.get('entregaArmazemId')!;
  }

  get entregaTempoColocarEntrega(){
    return this.entregaForm.get('entregaTempoColocarEntrega')!;
  }

  get entregaTempoRetirarEntrega(){
    return this.entregaForm.get('entregaTempoRetirarEntrega')!;
  }

  add(id: string, data: string, massa: number, armazemId: string, tempoColocarEntrega: number, tempoRetirarEntrega: number): void{
    id = id.trim();
    if(!id){
      return;
    }
    this.entregaService.addEntrega({id, data, armazemId, tempoColocarEntrega, tempoRetirarEntrega} as Entrega)
    .subscribe((entrega: Entrega) => {
      this.entregas.push(entrega);
    });
  }

}
