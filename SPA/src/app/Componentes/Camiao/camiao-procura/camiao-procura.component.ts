import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Camiao } from 'src/app/Modelos/camiao';
import { CamiaoService } from 'src/app/Servicos/Camiao/camiao.service';

@Component({
  selector: 'app-camiao-procura',
  templateUrl: './camiao-procura.component.html',
  styleUrls: ['./camiao-procura.component.css'],
})
export class CamiaoProcuraComponent implements OnInit {
  camiaos$!: Observable<Camiao[]>;
  private searchTerms = new Subject<string>();

  constructor(private camiaoService: CamiaoService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.camiaos$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.camiaoService.searchCamiao(term))
    );
  }
}
