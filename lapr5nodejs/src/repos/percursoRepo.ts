import { Service, Inject } from 'typedi';

import  IPercursoRepo  from "../services/IRepos/IPercursoRepo";
import { Percurso } from "../domain/percursoPackage/percurso";
import { PercursoId } from "../domain/percursoPackage/percursoId";
import { PercursoMap } from "../mappers/PercursoMap";

import { Document, FilterQuery, Model } from 'mongoose';
import { IPercursoPersistence } from '../dataschema/IPercursoPersistence';

@Service()
export default class PercursoRepo implements IPercursoRepo {
  private models: any;

  constructor(
    @Inject('percursoSchema') private percursoSchema : Model<IPercursoPersistence & Document>,
  ) {}

  private createBaseQuery (): any {
    return {
      where: {},
    }
  }

  public async exists(percurso: Percurso): Promise<boolean> {
    
    //const idX = percurso.id instanceof PercursoId ? (<PercursoId>percurso.armazem1).toValue() : percurso.armazem1;
    const idX = percurso.armazem1;
    const idY = percurso.armazem2;


    const query = { domainId: idX, idY}; 
    const percursoDocument = await this.percursoSchema.findOne( query as FilterQuery<IPercursoPersistence & Document>);

    return !!percursoDocument === true;
  }

  public async save (percurso: Percurso): Promise<Percurso> {
    const query = { armazem1: percurso.armazem1.toString(), armazem2: percurso.armazem2.toString()}; 

    console.log(query); /////////////

    const percursoDocument = await this.percursoSchema.findOne( query );

    try {
      if (percursoDocument === null ) {
        const rawPercurso: any = PercursoMap.toPersistence(percurso);

        const percursoCreated = await this.percursoSchema.create(rawPercurso);

        return PercursoMap.toDomain(percursoCreated);
      } else {
        percursoDocument.armazem1 = percurso.armazem1.value;
        percursoDocument.armazem2 = percurso.armazem2.value;
        percursoDocument.distancia = percurso.distancia.value;
        percursoDocument.tempo = percurso.tempo.value;
        percursoDocument.cargaExtra = percurso.cargaExtra.value;
        percursoDocument.energia = percurso.energia.value;
        
        await percursoDocument.save();

        return percurso;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findByArmazens (armazem1: string, armazem2 : string): Promise<Percurso>{
    const percursoList = this.findAll();
    var finalPercurso = null;

    (await percursoList).forEach((element) => {
        if (armazem1 == element.armazem1.value && armazem2 == element.armazem2.value) {
          finalPercurso = element;
        }
    });
    return finalPercurso;
}

/*  public async findByArmazem1 (armazem1: number): Promise<Percurso>{
    const percursoList = this.findAll();
    var finalPercurso = null;

    (await percursoList).forEach((element) => {
        if (armazem1 == element.armazem1.value) {
          finalPercurso = element;
        }
    });
    return finalPercurso;
}

public async findByArmazem2 (armazem2: number): Promise<Percurso>{
  const percursoList = this.findAll();
  var finalPercurso = null;

  (await percursoList).forEach((element) => {
      if (armazem2 == element.armazem2.value) {
        finalPercurso = element;
      }
  });
  return finalPercurso;
}*/

public async findAll(): Promise<Percurso[]> {
  try{
    const routesRecord = await this.percursoSchema.find();
    var list:Percurso[]=[];
    if(routesRecord != null){
      routesRecord.forEach(async element => {
        list.push(await PercursoMap.toDomain(element))
      })
      return list;
    }
  } catch(e){
    throw e;
  }
  return null;
}

/* public async findByDomainId (percursoId: PercursoId | string): Promise<Percurso> {
    const query = { domainId: percursoId};
    const percursoRecord = await this.percursoSchema.findOne( query as FilterQuery<IPercursoPersistence & Document> );

    if( percursoRecord != null) {
      return PercursoMap.toDomain(percursoRecord);
    }
    else
      return null;
  }*/
}