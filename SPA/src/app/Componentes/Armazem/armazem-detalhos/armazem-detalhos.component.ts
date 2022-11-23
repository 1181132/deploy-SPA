import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Armazem } from '../../../Modelos/armazem';
import { ArmazemService } from '../../../Servicos/Armazens/armazem.service';

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

  ngOnInit(): void {
    this.getArmazem();
  }

  getArmazem(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.armazemService.getArmazem(id)
      .subscribe(armazem => this.armazem = armazem);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.armazem) {
      this.armazemService.updateHero(this.armazem)
        .subscribe(() => this.goBack());
    }
  }
}
