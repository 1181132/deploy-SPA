import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Armazem } from '../../../Modelos/armazem';
import { ArmazemService } from '../../../Servicos/Armazens/armazem.service';

@Component({
  selector: 'app-listarArmazem',
  templateUrl: './listarArmazem.component.html',
  styleUrls: ['./listarArmazem.component.css']
})
export class ListarArmazemComponent implements OnInit {
  armazens: Armazem[] = [];

  constructor(private htppClient: HttpClient, private armazemService: ArmazemService) { }

  ngOnInit(): void {
    this.getArmazens();
  }


/*   getArmazens(): void {
    this.htppClient.get<any>('https://localhost:5001/api/Armazens').subscribe( 
      (          response: Armazem[]) => {
        console.log(response);
        this.armazens = response;
      }
    );
  } */

  getArmazens(): void {
    this.armazemService.getArmazens()
      .subscribe((armazens: Armazem[]) => this.armazens = armazens);
  }
  
   delete(armazem: Armazem): void {
    this.armazens = this.armazens.filter(h => h !== armazem);
    this.armazemService.deleteArmazem(armazem.id).subscribe();
  } 
}
