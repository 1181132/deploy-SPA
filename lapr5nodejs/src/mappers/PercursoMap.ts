import { Mapper } from "../core/infra/Mapper";

import { Document, Model } from 'mongoose';
import { IPercursoPersistence } from '../dataschema/IPercursoPersistence';

import  IPercursoDTO  from "../dto/IPercursoDTO";
import { Percurso } from "../domain/percursoPackage/percurso";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Distancia } from "../domain/percursoPackage/distancia";
import { Tempo } from "../domain/percursoPackage/tempo";
import { Energia } from "../domain/percursoPackage/energia";
import { CargaExtra } from "../domain/percursoPackage/cargaExtra";
import { Armazem1 } from "../domain/percursoPackage/armazem1";
import { Armazem2 } from "../domain/percursoPackage/armazem2";

export class PercursoMap extends Mapper<Percurso> {
  
  public static toDTO( percurso: Percurso): IPercursoDTO {
    return {
      armazem1: percurso.armazem1,
      armazem2: percurso.armazem2,
      distancia: percurso.distancia,
      tempo: percurso.tempo,
      energia: percurso.energia,
      cargaExtra: percurso.cargaExtra,
    } as unknown as IPercursoDTO;
  }

  public static toDomain (percurso: any | Model<IPercursoPersistence & Document> ): Percurso {
    
    const armazem1OrError = Armazem1.create(percurso.armazem1);
    const armazem2OrError = Armazem2.create(percurso.armazem2);
    const distanciaOrError = Distancia.create(percurso.distancia);
    const tempoOrError = Tempo.create(percurso.distancia);
    const energiaOrError = Energia.create(percurso.energia);
    const cargaExtraOrError = CargaExtra.create(percurso.cargaExtra);
    


    const percursoOrError = Percurso.create({
      armazem1: armazem1OrError.getValue(),
      armazem2: armazem2OrError.getValue(),
      distancia: distanciaOrError.getValue(),
      tempo: tempoOrError.getValue(),
      energia: energiaOrError.getValue(),
      cargaExtra: cargaExtraOrError.getValue()
    }, new UniqueEntityID(percurso.domainId)); ////////////////////////////////////////

    percursoOrError.isFailure ? console.log(percursoOrError.error) : '';

    return percursoOrError.isSuccess ? percursoOrError.getValue() : null;
  }

  public static toPersistence (percurso: Percurso): any {
    const a = {
      armazem1: percurso.armazem1.value, /////////////////////////
      armazem2: percurso.armazem2.value,
      distancia: percurso.distancia.value,
      tempo: percurso.tempo.value,
      energia: percurso.energia.value,
      cargaExtra: percurso.cargaExtra.value
    }
    return a;
  }
}