import { Component, OnInit} from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

 import { Entrega } from '../../../Modelos/entrega';
 import { EntregaService } from 'src/app/Servicos/Entregas/entrega.service';

@Component({
  selector: 'app-entrega-procura',
  templateUrl: './entrega-procura.component.html',
  styleUrls: ['./entrega-procura.component.css']
})
export class EntregaProcuraComponent implements OnInit {
  entregas$!: Observable<Entrega[]>;
  private searchTerms = new Subject<string>();

  constructor(private entregaSerice: EntregaService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.entregas$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.entregaSerice.searchEntregas(term)),
    );
  }
}
