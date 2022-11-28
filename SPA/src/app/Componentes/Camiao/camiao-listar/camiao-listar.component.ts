import { Component, OnInit } from '@angular/core';
import { Camiao } from 'src/app/Modelos/camiao';
import { CamiaoService } from 'src/app/Servicos/Camiao/camiao.service';

@Component({
  selector: 'app-camiao-listar',
  templateUrl: './camiao-listar.component.html',
  styleUrls: ['./camiao-listar.component.css']
})
export class CamiaoListarComponent implements OnInit {
  camiaos: Camiao[] = [];

  constructor(private camiaoService: CamiaoService) { }

  ngOnInit(): void {
    this.getCamiaos();
  }

  getCamiaos(): void {
    this.camiaoService.getCamiaos()
      .subscribe((camiaos: Camiao[]) => this.camiaos = camiaos);
  }
  
  delete(camiao: Camiao): void {
    this.camiaos = this.camiaos.filter(h => h !== camiao);
    this.camiaoService.deleteCamiao(camiao.matricula).subscribe();
  }

}
