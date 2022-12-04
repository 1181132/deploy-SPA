import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Armazem } from '../../../Modelos/armazem';
import { ArmazemService } from '../../../Servicos/Armazens/armazem.service';

@Component({
  selector: 'app-armazem-procura',
  templateUrl: './armazem-procura.component.html',
  styleUrls: ['./armazem-procura.component.css'],
})
export class ArmazemProcuraComponent implements OnInit {
  armazens$!: Observable<Armazem[]>;
  private searchTerms = new Subject<string>();

  constructor(private armazemService: ArmazemService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.armazens$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.armazemService.searchArmazens(term))
      
    );
  }
}
