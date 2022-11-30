import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Percurso } from 'src/app/Modelos/percurso';
import { PercursoService } from 'src/app/Servicos/Percurso/percurso.service';
import { __values } from 'tslib';

@Component({
  selector: 'app-percurso-criar',
  templateUrl: './percurso-criar.component.html',
  styleUrls: ['./percurso-criar.component.css'],
})
export class PercursoCriarComponent implements OnInit {
  percursos: Percurso[] = [];

  constructor(private percursoService: PercursoService) {}

  percursoForm!: FormGroup;

  ngOnInit(): void {
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
    });
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

  add(
    armazem1: string,
    armazem2: string,
    distancia: number,
    tempo: number,
    energia: number,
    cargaExtra: number
  ): void {
    armazem1 = armazem1.trim();
    if (!armazem1) {
      return;
    }
    this.percursoService
      .addPercurso({
        armazem1,
        armazem2,
        distancia,
        tempo,
        energia,
        cargaExtra,
      } as Percurso)
      .subscribe((percurso: Percurso) => {
        this.percursos.push(percurso);
      });
  }
}
