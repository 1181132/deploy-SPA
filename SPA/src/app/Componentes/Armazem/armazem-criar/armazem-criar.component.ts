import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Armazem } from '../../../Modelos/armazem';
import { ArmazemService } from 'src/app/Servicos/Armazens/armazem.service';
import { __values } from 'tslib';

@Component({
  selector: 'app-armazens',
  templateUrl: 'armazem-criar.component.html',
  styleUrls: ['./armazem-criar.component.css'],
})
export class ArmazemCriarComponent implements OnInit {
  armazens: Armazem[] = [];

  constructor(private armazemService: ArmazemService) {}

  armazemForm!: FormGroup;

  ngOnInit(): void {
    this.armazemForm = new FormGroup({
      armazemId: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z0-9]{3}'),
        Validators.maxLength(3),
      ]),
      armazemDesignacao: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
      ]),
      armazemRua: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
      ]),
      armazemNumeroPorta: new FormControl('', [
        Validators.required,
        Validators.min(1),
      ]),
      armazemCodigoPostal: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]{4}-[0-9]{3}'),
      ]),
      armazemCidade: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
      ]),
      armazemPais: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
      ]),
      armazemLatitude: new FormControl('', [
        Validators.required,
        Validators.max(90),
        Validators.min(-90)
      ]),
      armazemLongitude: new FormControl('', [
        Validators.required,
        Validators.max(180),
        Validators.min(-180),
      ]),
<<<<<<< HEAD:SPA/src/app/Componentes/Armazem/armazem-criar/armazem-criarcomponent.ts
      armazemLatitude: new FormControl('', [
        Validators.required,
        Validators.max(90),
        Validators.min(-90),
      ]),
    });
=======
      armazemAltura: new FormControl('', [
        Validators.required
      ])                 
    })    
   
>>>>>>> c48dab24e2d5a994972c1bfebcef545cc8fd1736:SPA/src/app/Componentes/Armazem/armazem-criar/armazem-criar.component.ts
  }

  get armazemId() {
    return this.armazemForm.get('armazemId')!;
  }

  get armazemDesignacao() {
    return this.armazemForm.get('armazemDesignacao')!;
  }

  get armazemRua() {
    return this.armazemForm.get('armazemRua')!;
  }

  get armazemNumeroPorta() {
    return this.armazemForm.get('armazemNumeroPorta')!;
  }

  get armazemCodigoPostal() {
    return this.armazemForm.get('armazemCodigoPostal')!;
  }

  get armazemCidade() {
    return this.armazemForm.get('armazemCidade')!;
  }

<<<<<<< HEAD:SPA/src/app/Componentes/Armazem/armazem-criar/armazem-criarcomponent.ts
  get armazemPais() {
    return this.armazemForm.get('armazemPais')!;
  }

  get armazemLongitude() {
    return this.armazemForm.get('armazemLongitude')!;
  }
=======
  get armazemLatitude() { return this.armazemForm.get('armazemLatitude')!; }

  get armazemLongitude() { return this.armazemForm.get('armazemLongitude')!; }

  get armazemAltura() { return this.armazemForm.get('armazemAltura')!; }
>>>>>>> c48dab24e2d5a994972c1bfebcef545cc8fd1736:SPA/src/app/Componentes/Armazem/armazem-criar/armazem-criar.component.ts

  get armazemLatitude() {
    return this.armazemForm.get('armazemLatitude')!;
  }

<<<<<<< HEAD:SPA/src/app/Componentes/Armazem/armazem-criar/armazem-criarcomponent.ts
  add(
    id: string,
    designacao: string,
    rua: string,
    numeroPorta: number,
    codigoPostal: string,
    cidade: string,
    pais: string,
    coordenadaLon: number,
    coordenadaLat: number
  ): void {
    designacao = designacao.trim();
    if (!designacao) {
      return;
    }
    this.armazemService
      .addArmazem({
        id,
        designacao,
        rua,
        numeroPorta,
        codigoPostal,
        cidade,
        pais,
        coordenadaLon,
        coordenadaLat,
      } as Armazem)
      .subscribe((armazem: Armazem) => {
        this.armazens.push(armazem);
      });
  }
=======
  add(id:string, designacao: string, rua: string, numeroPorta: number,codigoPostal:string ,cidade: string, pais : string,
    coordenadaLat: number, coordenadaLon: number, altura: number): void {
       designacao = designacao.trim();
       if (!designacao) { return; }
       this.armazemService.addArmazem({id ,designacao, rua ,numeroPorta,codigoPostal,
         cidade,pais,coordenadaLat,coordenadaLon, altura  } as Armazem)
         .subscribe((armazem: Armazem) => {
           this.armazens.push(armazem);
         });
     }  
>>>>>>> c48dab24e2d5a994972c1bfebcef545cc8fd1736:SPA/src/app/Componentes/Armazem/armazem-criar/armazem-criar.component.ts
}
