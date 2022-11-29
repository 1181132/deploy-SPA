import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { __values } from 'tslib';
import { CamiaoService } from 'src/app/Servicos/Camiao/camiao.service';
import { Camiao } from 'src/app/Modelos/camiao';

@Component({
  selector: 'app-camiao-criar',
  templateUrl: './camiao-criar.component.html',
  styleUrls: ['./camiao-criar.component.css'],
})
export class CamiaoCriarComponent implements OnInit {
  camiaos: Camiao[] = [];

  constructor(private camiaoService: CamiaoService) {}

  camiaoForm!: FormGroup;

  ngOnInit(): void {
    this.camiaoForm = new FormGroup({
      camiaoTara: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
        Validators.min(1),
      ]),
      camiaoMatricula: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '([A-Z]{2}-[0-9]{2}-[0-9]{2})|([0-9]{2}-[A-Z]{2}-[0-9]{2})|([0-9]{2}-[0-9]{2}-[A-Z]{2})|([A-Z]{2}-[0-9]{2}-[A-Z]{2})'
        ),
      ]),
      camiaoCapacidadeCarga: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
        Validators.min(1),
      ]),
      camiaoCargaTotalBaterias: new FormControl('', [
        Validators.required,
        Validators.min(1),
      ]),
      camiaoAutonomiaCargaMax: new FormControl('', [
        Validators.required,
        Validators.min(1),
      ]),
      camiaoTempoCarregamento20ate80: new FormControl('', [
        Validators.required,
        Validators.min(1),
        Validators.maxLength(50),
      ]),
    });
  }

  get camiaoTara() {
    return this.camiaoForm.get('camiaoTara')!;
  }

  get camiaoMatricula() {
    return this.camiaoForm.get('camiaoMatricula')!;
  }

  get camiaoCapacidadeCarga() {
    return this.camiaoForm.get('camiaoCapacidadeCarga')!;
  }

  get camiaoCargaTotalBaterias() {
    return this.camiaoForm.get('camiaoCargaTotalBaterias')!;
  }

  get camiaoAutonomiaCargaMax() {
    return this.camiaoForm.get('camiaoAutonomiaCargaMax')!;
  }

  get camiaoTempoCarregamento20ate80() {
    return this.camiaoForm.get('camiaoTempoCarregamento20ate80')!;
  }

  add(
    tara: number,
    matricula: string,
    capacidadeCarga: number,
    cargaTotalBaterias: number,
    autonomiaCargaMax: number,
    tempoCarregamento20ate80: number
  ): void {
    matricula = matricula.trim();
    if (!matricula) {
      return;
    }
    this.camiaoService
      .addCamiao({
        tara,
        matricula,
        capacidadeCarga,
        cargaTotalBaterias,
        autonomiaCargaMax,
        tempoCarregamento20ate80,
      } as Camiao)
      .subscribe((camiao: Camiao) => {
        this.camiaos.push(camiao);
      });
  }
}
