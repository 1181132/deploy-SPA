import { Component, OnInit } from '@angular/core';

import { Armazem } from '../../../Modelos/armazem';
import { ArmazemK } from '../../../Modelos/armazem2';
import { ArmazemService } from '../../../Servicos/Armazens/armazem.service';

@Component({
  selector: 'app-armazens',
  templateUrl: './armazens.component.html',
  styleUrls: ['./armazens.component.css']
})
export class ArmazensComponent implements OnInit {
  armazens: Armazem[] = [];

  constructor(private armazemService: ArmazemService) { }

  ngOnInit(): void {
    this.getArmazens();
  }

  getArmazens(): void {
    this.armazemService.getArmazens()
    .subscribe(armazens => this.armazens = armazens);
  }

  add(name: string, coordLat: number, coordLon: number): void {
    name = name.trim();
    if (!name) { return; }
    this.armazemService.addArmazem({ name,coordLat,coordLon } as Armazem)
      .subscribe(armazem => {
        this.armazens.push(armazem);
      });
  }

  submitted = false;
  onSubmit() { this.submitted = true; }
  model = new ArmazemK(18, 'Braga', 0, 0);

  delete(armazem: Armazem): void {
    this.armazens = this.armazens.filter(h => h !== armazem);
    this.armazemService.deleteArmazem(armazem.id).subscribe();
  }
}