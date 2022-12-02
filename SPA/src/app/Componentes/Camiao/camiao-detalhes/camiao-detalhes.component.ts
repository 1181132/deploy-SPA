import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Camiao } from 'src/app/Modelos/camiao';
import { CamiaoService } from 'src/app/Servicos/Camiao/camiao.service';

@Component({
  selector: 'app-camiao-detalhes',
  templateUrl: './camiao-detalhes.component.html',
  styleUrls: ['./camiao-detalhes.component.css']
})
export class CamiaoDetalhesComponent implements OnInit{

  camiao: Camiao | undefined;

  constructor(
    private route: ActivatedRoute,
    private camiaoService: CamiaoService,
    private location: Location
  ) {}

  camiaoForm!: FormGroup;

  ngOnInit(): void {
    this.getCamiao();
      this.camiaoForm = new FormGroup({
        camiaoTara: new FormControl('', [
          Validators.required,
          Validators.maxLength(50),
          Validators.min(1)
        ]),
        camiaoMatricula: new FormControl('', [
          Validators.required,
          Validators.pattern('([A-Z]{2}-[0-9]{2}-[0-9]{2})|([0-9]{2}-[A-Z]{2}-[0-9]{2})|([0-9]{2}-[0-9]{2}-[A-Z]{2})|([A-Z]{2}-[0-9]{2}-[A-Z]{2})'),
          
        ]),
        camiaoCapacidadeCarga: new FormControl('', [
          Validators.required,
          Validators.maxLength(50),
          Validators.min(1)
        ]),
        camiaoCargaTotalBaterias: new FormControl('', [
          Validators.required,
          Validators.min(1)
        ]),
        camiaoAutonomiaCargaMax: new FormControl('', [
          Validators.required,
          Validators.min(1),
        ]),
        camiaoTempoCarregamento20ate80: new FormControl('', [
          Validators.required,
          Validators.min(1),
          Validators.maxLength(50)
        ])         
  
      })     
  }

  getCamiao(): void {
    const id = this.route.snapshot.paramMap.get('matricula')!;
    this.camiaoService.getCamiao(id)
      .subscribe((camiao: Camiao | undefined) => this.camiao = camiao);
  }

  voltar(): void {
    this.location.back();
  }

  guardar(): void {
    if (this.camiao) {
      this.camiaoService.updateCamiao(this.camiao)
        .subscribe(() => this.voltar());
    }
  }

  get camiaoTara() { return this.camiaoForm.get('camiaoTara')!; }

  get camiaoMatricula() { return this.camiaoForm.get('camiaoMatricula')!; }

  get camiaoCapacidadeCarga() { return this.camiaoForm.get('camiaoCapacidadeCarga')!; }

  get camiaoCargaTotalBaterias() { return this.camiaoForm.get('camiaoCargaTotalBaterias')!; }

  get camiaoAutonomiaCargaMax() { return this.camiaoForm.get('camiaoAutonomiaCargaMax')!; }

  get camiaoTempoCarregamento20ate80() { return this.camiaoForm.get('camiaoTempoCarregamento20ate80')!; }

}
