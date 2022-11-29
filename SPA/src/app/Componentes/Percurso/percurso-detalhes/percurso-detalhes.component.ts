import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { PercursoService } from '../../../Servicos/Percurso/percurso.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Percurso } from 'src/app/Modelos/percurso';

@Component({
  selector: 'app-percurso-detalhes',
  templateUrl: './percurso-detalhes.component.html',
  styleUrls: ['./percurso-detalhes.component.css']
})
export class PercursoDetalhesComponent implements OnInit{
  percurso: Percurso | undefined;

  constructor(
    private route: ActivatedRoute,
    private percursoService: PercursoService,
    private location: Location
  ) {}

  percursoForm!: FormGroup;

  ngOnInit(): void {
    this.getPercurso();
    this.percursoForm = new FormGroup({
      percursoArmazem1: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z0-9]{3}'),
        Validators.maxLength(50)
      ]),
      percursoArmazem2: new FormControl('', [
        Validators.required,
        Validators.min(1),
        Validators.pattern('[a-zA-Z0-9]{3}'),
      ]),
      percursoDistancia: new FormControl('', [
        Validators.required,
        Validators.min(1),
      ]),
      percursoTempo: new FormControl('', [
        Validators.required,
        Validators.min(1),
      ]),
      percursoEnergia: new FormControl('', [
        Validators.required,
        Validators.min(1),
      ]),
      percursoCargaExtra: new FormControl('', [
        Validators.required,
        Validators.min(1),
      ]),

    })    
  }

  getPercurso(): void {
    const id = this.route.snapshot.paramMap.get('armazem1')!;
    this.percursoService.getPercurso(id)
      .subscribe((percurso: Percurso | undefined) => this.percurso = percurso);
  }

  voltar(): void {
    this.location.back();
  }

  guardar(): void {
    if (this.percurso) {
      this.percursoService.updatePercurso(this.percurso)
        .subscribe(() => this.voltar());
    }
  }

  get percursoArmazem1() {
    return this.percursoForm.get('percursoArmazem1')!;
  }

  get percursoArmazem2() {
    return this.percursoForm.get('percursoArmazem2')!;
  }

  get percursoDistancia() {
    return this.percursoForm.get('percursoDistancia')!;
  }

  get percursoTempo() {
    return this.percursoForm.get('percursoTempo')!;
  }

  get percursoEnergia() {
    return this.percursoForm.get('percursoEnergia')!;
  }

  get percursoCargaExtra() {
    return this.percursoForm.get('percursoCargaExtra')!;
  }
}

