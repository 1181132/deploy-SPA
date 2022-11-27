import { Mapper } from "../core/infra/Mapper";

import { Document, Model } from 'mongoose';
//import { IPlaneamentoPersistence } from '../dataschema/IPlaneamentoPersistence';

import  IPlaneamentoDTO  from "../dto/IPlaneamentoDTO";
import { Planeamento } from "../domain/planeamentoPackage/planeamento";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Camiao } from "../domain/camiaoPackage/camiao";
import { Data } from "../domain/planeamentoPackage/data";


export class PlaneamentoMap extends Mapper<Planeamento> {
  
  public static toDTO( planeamento: Planeamento): IPlaneamentoDTO {
    return {
      camiao: planeamento.camiao,
      data: planeamento.data,
      
    } as unknown as IPlaneamentoDTO;
  }

  public static toDomain (planeamento: any /*| Model<IPlaneamentoPersistence & Document>*/ ): Planeamento {
    
    const camiaoOrError = Camiao.create(planeamento.camiao);
    const dataOrError = Data.create(planeamento.data.dia, planeamento.data.mes, planeamento.data.ano);
   
    


    const planeamentoOrError = Planeamento.create({
      camiao: camiaoOrError.getValue(),
      data: dataOrError.getValue(),
      
    }, new UniqueEntityID(planeamento.domainId)); ////////////////////////////////////////

    planeamentoOrError.isFailure ? console.log(planeamentoOrError.error) : '';

    return planeamentoOrError.isSuccess ? planeamentoOrError.getValue() : null;
  }
/*
  public static toPersistence (planeamento: Planeamento): any {
    const a = {
      armazem1: planeamento.armazem1.value, /////////////////////////
      armazem2: planeamento.armazem2.value,
      distancia: planeamento.distancia.value,
      tempo: planeamento.tempo.value,
      energia: planeamento.energia.value,
      cargaExtra: planeamento.cargaExtra.value
    }
    return a;
  }*/
}