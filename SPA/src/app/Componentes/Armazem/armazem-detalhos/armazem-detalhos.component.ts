import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Armazem } from '../../../Modelos/armazem';
import { ArmazemService } from '../../../Servicos/Armazens/armazem.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-armazem-detalhos',
  templateUrl: './armazem-detalhos.component.html',
  styleUrls: ['./armazem-detalhos.component.css']
})
export class ArmazemDetalhosComponent implements OnInit {
  armazem: Armazem | undefined;

  constructor(
    private route: ActivatedRoute,
    private armazemService: ArmazemService,
    private location: Location
  ) {}

  armazemForm!: FormGroup;

  ngOnInit(): void {
    this.getArmazem();
    this.armazemForm = new FormGroup({
      armazemDesignacao: new FormControl('', [
        Validators.required,
        Validators.maxLength(50)
      ]),
      armazemRua: new FormControl('', [
        Validators.required,
        Validators.maxLength(50)
      ]),
      armazemNumeroPorta: new FormControl('', [
        Validators.required,
        Validators.min(1)
      ]),
      armazemCodigoPostal: new FormControl('', [
        Validators.required,
        Validators.pattern("[0-9]{4}-[0-9]{3}")
      ]),
      armazemCidade: new FormControl('', [
        Validators.required,
        Validators.maxLength(50)
      ]),
      armazemPais: new FormControl('', [
        Validators.required,
        Validators.maxLength(50)
      ]),
      armazemLatitude: new FormControl('', [
        Validators.required,
        Validators.max(90),
        Validators.min(-90)
      ]),
      armazemLongitude: new FormControl('', [
        Validators.required,
        Validators.max(180),
        Validators.min(-180)
      ]),
      armazemAltura: new FormControl('', [
        Validators.required
      ])       
    })    
  }

  getArmazem(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.armazemService.getArmazem(id)
      .subscribe((armazem: Armazem | undefined) => this.armazem = armazem);
  }

  voltar(): void {
    this.location.back();
  }

  guardar(): void {
    if (this.armazem) {
      this.armazemService.updateArmazem(this.armazem)
        .subscribe(() => this.voltar());
    }
  }

  get armazemId() { return this.armazemForm.get('armazemId')!; }

  get armazemDesignacao() { return this.armazemForm.get('armazemDesignacao')!; }

  get armazemRua() { return this.armazemForm.get('armazemRua')!; }

  get armazemNumeroPorta() { return this.armazemForm.get('armazemNumeroPorta')!; }

  get armazemCodigoPostal() { return this.armazemForm.get('armazemCodigoPostal')!; }

  get armazemCidade() { return this.armazemForm.get('armazemCidade')!; }

  get armazemPais() { return this.armazemForm.get('armazemPais')!; }

  get armazemLatitude() { return this.armazemForm.get('armazemLatitude')!; }

  get armazemLongitude() { return this.armazemForm.get('armazemLongitude')!; }

  get armazemAltura() { return this.armazemForm.get('armazemAltura')!; }

}
