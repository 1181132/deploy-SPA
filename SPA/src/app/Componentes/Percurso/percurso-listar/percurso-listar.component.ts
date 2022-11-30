import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Percurso } from 'src/app/Modelos/percurso';
import { PercursoService } from 'src/app/Servicos/Percurso/percurso.service';
import { Armazem } from '../../../Modelos/armazem';
import { ArmazemService } from '../../../Servicos/Armazens/armazem.service';

@Component({
  selector: 'app-percurso-listar',
  templateUrl: './percurso-listar.component.html',
  styleUrls: ['./percurso-listar.component.css']
})
export class PercursoListarComponent {
  percursos: Percurso[] = [];

  constructor(private htppClient: HttpClient, private percursoService: PercursoService) { }

  ngOnInit(): void {
    this.getPercursos();
  }

  getPercursos(): void {
    this.percursoService.getPercursos()
      .subscribe((percursos: Percurso[]) => this.percursos = percursos);
  }
  
   delete(percurso: Percurso): void {
    this.percursos = this.percursos.filter(h => h !== percurso);
    this.percursoService.deletePercurso(percurso.armazem1).subscribe();
  } 
}
