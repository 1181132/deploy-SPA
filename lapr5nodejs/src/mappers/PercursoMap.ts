import { Mapper } from "../core/infra/Mapper";

import { Document, Model } from 'mongoose';
import { IPercursoPersistence } from '../dataschema/IPercursoPersistence';

import  IPercursoDTO  from "../dto/IPercursoDTO";
import { Percurso } from "../domain/percurso";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";

export class PercursoMap extends Mapper<Percurso> {
  
  public static toDTO( percurso: Percurso): IPercursoDTO {
    return {
      armazem1: percurso.armazem1,
      armazem2: percurso.armazem2,
      distancia: percurso.distancia,
      tempo: percurso.tempo,
      energia: percurso.energia,
      cargaExtra: percurso.cargaExtra,
    } as IPercursoDTO;
  }

  public static toDomain (percurso: any | Model<IPercursoPersistence & Document> ): Percurso {
    const percursoOrError = Percurso.create(
      percurso,
      new UniqueEntityID(percurso.tempo),
    );

    percursoOrError.isFailure ? console.log(percursoOrError.error) : '';

    return percursoOrError.isSuccess ? percursoOrError.getValue() : null;
  }

  public static toPersistence (percurso: Percurso): any {
    return {
      armazem1: percurso.armazem1.toString(),
      armazem2: percurso.armazem2.toString(),
      distancia: percurso.distancia.toString(),
      tempo: percurso.tempo.toString(),
      energia: percurso.energia.toString(),
      cargaExtra: percurso.cargaExtra.toString(),
    }
  }
}