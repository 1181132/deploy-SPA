import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';


import { Entrega } from '../../../Modelos/entrega';
import { EntregaService } from 'src/app/Servicos/Entregas/entrega.service';

@Component({
  selector: 'app-entrega-detalhes',
  templateUrl: './entrega-detalhes.component.html',
  styleUrls: ['./entrega-detalhes.component.css']
})
export class EntregaDetalhesComponent implements OnInit {
  entrega: Entrega | undefined;

  constructor(
    private route: ActivatedRoute,
    private entregaService: EntregaService,
    private location: Location
  ) {}

  entregaForm!: FormGroup;

  ngOnInit(): void {
    this.getEntrega();
    this.entregaForm = new FormGroup({
      entregaId: new FormControl('', [
      Validators.required,
      Validators.min(0)
    ]),
    entregaData: new FormControl('', [
      Validators.required,
      Validators.pattern("(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)")
    ]),
    entregaMassa: new FormControl('', [
      Validators.required,
      Validators.min(0)
    ]),
    entregaArmazemId: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z0-9]{3}'),
      Validators.maxLength(3)
    ]),
    entregaTempoColocarEntrega: new FormControl('', [
      Validators.required,
      Validators.min(0)
    ]),
    entregaTempoRetirarEntrega: new FormControl('', [
      Validators.required,
      Validators.min(0)
    ])        
    })    
  }

  getEntrega(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.entregaService.getEntrega(id)
      .subscribe((entrega: Entrega | undefined) => this.entrega = entrega);
  }

  voltar(): void {
    this.location.back();
  }

  guardar(): void {
    if (this.entrega) {
      this.entregaService.updateEntrega(this.entrega)
        .subscribe(() => this.voltar());
    }
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

}
