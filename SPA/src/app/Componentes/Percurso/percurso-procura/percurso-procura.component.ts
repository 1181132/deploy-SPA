import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Percurso } from 'src/app/Modelos/percurso';
import { PercursoService } from 'src/app/Servicos/Percurso/percurso.service';




@Component({
  selector: 'app-percurso-procura',
  templateUrl: './percurso-procura.component.html',
  styleUrls: ['./percurso-procura.component.css']
})
export class PercursoProcuraComponent {
  percursos$!: Observable<Percurso[]>;
  private searchTerms = new Subject<string>();

  constructor(private percursoService: PercursoService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.percursos$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.percursoService.searchPercurso(term))
    );
  }

}
