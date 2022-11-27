import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Armazem } from '../../../Modelos/armazem';
import { ArmazemService } from 'src/app/Servicos/Armazens/armazem.service';
import { __values } from 'tslib';

@Component({
  selector: 'app-armazens',
  templateUrl: './armazens.component.html',
  styleUrls: ['./armazens.component.css']
})


export class ArmazensComponent implements OnInit {
  armazens: Armazem[] = [];

constructor( private armazemService: ArmazemService) { }

  armazemForm!: FormGroup;

  ngOnInit(): void {
    this.armazemForm = new FormGroup({
      armazemId: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z0-9]{3}'),
        Validators.maxLength(3)
      ]),
      armazemDesignacao: new FormControl('', [
        Validators.required,
        Validators.maxLength(50)
      ]),
      armazemRua: new FormControl('', [
        Validators.required,
        Validators.maxLength(50)
      ]),
      armazemNumeroPorta: new FormControl('', [
        Validators.required,
        Validators.min(1)
      ]),
      armazemCodigoPostal: new FormControl('', [
        Validators.required,
        Validators.pattern("[0-9]{4}-[0-9]{3}")
      ]),
      armazemCidade: new FormControl('', [
        Validators.required,
        Validators.maxLength(50)
      ]),
      armazemPais: new FormControl('', [
        Validators.required,
        Validators.maxLength(50)
      ]),
      armazemLongitude: new FormControl('', [
        Validators.required,
        Validators.max(180),
        Validators.min(-180)
      ]),
        armazemLatitude: new FormControl('', [
        Validators.required,
        Validators.max(90),
        Validators.min(-90)])                 

    })    
   
  }

  get armazemId() { return this.armazemForm.get('armazemId')!; }

  get armazemDesignacao() { return this.armazemForm.get('armazemDesignacao')!; }

  get armazemRua() { return this.armazemForm.get('armazemRua')!; }

  get armazemNumeroPorta() { return this.armazemForm.get('armazemNumeroPorta')!; }

  get armazemCodigoPostal() { return this.armazemForm.get('armazemCodigoPostal')!; }

  get armazemCidade() { return this.armazemForm.get('armazemCidade')!; }

  get armazemPais() { return this.armazemForm.get('armazemPais')!; }

  get armazemLongitude() { return this.armazemForm.get('armazemLongitude')!; }

  get armazemLatitude() { return this.armazemForm.get('armazemLatitude')!; }


  add(id:string, designacao: string, rua: string, numeroPorta: number,codigoPostal:string ,cidade: string, pais : string,
    coordenadaLon: number,coordenadaLat: number): void {
       designacao = designacao.trim();
       if (!designacao) { return; }
       this.armazemService.addArmazem({id ,designacao, rua ,numeroPorta,codigoPostal,
         cidade,pais,coordenadaLon, coordenadaLat } as Armazem)
         .subscribe((armazem: Armazem) => {
           this.armazens.push(armazem);
         });
     }  
}











































/* import { Component, OnInit } from '@angular/core';
import { __values } from 'tslib';

import { Armazem } from '../../../Modelos/armazem';
import { ArmazemK } from '../../../Modelos/armazem2';
import { ArmazemService } from '../../../Servicos/Armazens/armazem.service';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

//import { forbiddenNameValidator } from '../shared/forbidden-name.directive';
//import { identityRevealedValidator } from '../shared/identity-revealed.directive';
//import { UniqueAlterEgoValidator } from '../shared/alter-ego.directive';

@Component({
  selector: 'app-armazens',
  templateUrl: './armazens.component.html',
  styleUrls: ['./armazens.component.css']
})
export class ArmazensComponent implements OnInit {
  armazens: Armazem[] = [];
  submitted=false;
  registerForm!: FormGroup;


  constructor(private formBuilder:FormBuilder, private armazemService: ArmazemService) { }

  armazem = { id: 'M13', designacao: 'Maçarelos', rua: 'aliados', numeroPorta:1732, codigoPostal:'0000-000', cidade:'Porto', pais:'Portugal',
coordLon: 0, coordLat: 0 }
 

  ngOnInit(): void {

    this.registerForm = this.formBuilder.group({
      armazemId:['',Validators.required,Validators.maxLength(3)],
      armazemDesignacao:['',Validators.required,Validators.maxLength(50)]
    })

    this.registerForm = new FormGroup({
      name: new FormControl(this.armazem.id, [
        Validators.required,
        Validators.maxLength(3),
      ])

  })}

  onSubmit(){
    this.submitted = true
    if (this.registerForm.invalid){
    return
  }

  alert("Success")
}

get id() { return this.registerForm.get('id')!; }
}
 */
/*     this.armazemForm = new FormGroup({
      id: new FormControl(this.armazem.id, [
        Validators.required,
        Validators.minLength(4),
      ]),

      designacao: new FormControl(this.armazem.designacao, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50)
      ]),
    },  ); // <-- add custom validator at the FormGroup level
  }

  get name() { return this.armazemForm.get('name')!; }

  get power() { return this.armazemForm.get('power')!; }

  get alterEgo() { return this.armazemForm.get('alterEgo')!; }

  //constructor(private alterEgoValidator: UniqueAlterEgoValidator) { }
} */



 //   this.getArmazens();
  

  /* getArmazens(): void {
    this.armazemService.getArmazens()
    .subscribe(armazens => this.armazens = armazens);
  } */

  //  add(id:string, designacao: string, rua: string, numeroPorta: number,codigoPostal:string ,cidade: string, pais : string,
  //     coordLon: number,coordLat: number): void {
  //   designacao = designacao.trim();
  //   console.log(__values)
  //   if (!designacao) { return; }
  //   this.armazemService.addArmazem({id ,designacao, rua ,numeroPorta,codigoPostal,
  //     cidade,pais,coordLon, coordLat } as Armazem)
  //     .subscribe(armazem => {
  //       this.armazens.push(armazem);
  //     });
  // } 

  //submitted = false;
  //onSubmit() { this.submitted = true; }
  //model = new ArmazemK(18, 'Braga', 0, 0);

/*   delete(armazem: Armazem): void {
    this.armazens = this.armazens.filter(h => h !== armazem);
    this.armazemService.deleteArmazem(armazem.id).subscribe();
  } */
