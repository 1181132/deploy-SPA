import { Service, Inject } from 'typedi';

import  IPercursoRepo  from "../services/IRepos/IPercursoRepo";
import { Percurso } from "../domain/percurso";
import { PercursoId } from "../domain/percursoId";
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
    
    const idX = percurso.id instanceof PercursoId ? (<PercursoId>percurso.id).toValue() : percurso.id;

    const query = { domainId: idX}; 
    const percursoDocument = await this.percursoSchema.findOne( query as FilterQuery<IPercursoPersistence & Document>);

    return !!percursoDocument === true;
  }

  public async save (percurso: Percurso): Promise<Percurso> {
    const query = { domainId: percurso.id.toString()}; 

    const percursoDocument = await this.percursoSchema.findOne( query );

    try {
      if (percursoDocument === null ) {
        const rawPercurso: any = PercursoMap.toPersistence(percurso);

        const percursoCreated = await this.percursoSchema.create(rawPercurso);

        return PercursoMap.toDomain(percursoCreated);
      } else {
        percursoDocument.armazem1 = percurso.armazem1;
        percursoDocument.armazem2 = percurso.armazem2;
        await percursoDocument.save();

        return percurso;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findByDomainId (percursoId: PercursoId | string): Promise<Percurso> {
    const query = { domainId: percursoId};
    const percursoRecord = await this.percursoSchema.findOne( query as FilterQuery<IPercursoPersistence & Document> );

    if( percursoRecord != null) {
      return PercursoMap.toDomain(percursoRecord);
    }
    else
      return null;
  }
}