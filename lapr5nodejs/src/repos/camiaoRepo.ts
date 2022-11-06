import { Service, Inject } from 'typedi';

import { Document, Model } from 'mongoose';
import ICamiaoRepo from '../services/IRepos/ICamiaoRepo';
import { ICamiaoPersistence } from '../dataschema/ICamiaoPersistence';
import { CamiaoId } from '../domain/camiaoPackage/camiaoId';
import { Camiao } from '../domain/camiaoPackage/camiao';
import { CamiaoMap } from '../mappers/CamiaoMap';

@Service()
export default class CamiaoRepo implements ICamiaoRepo {
  private models: any;

  constructor(
    @Inject('camiaoSchema') private camiaoSchema : Model<ICamiaoPersistence & Document>,
  ) { }
  

  private createBaseQuery (): any {
    return {
      where: {},
    }
  }

  public async exists (camiaoId: CamiaoId | string): Promise<boolean> {

    const idX = camiaoId instanceof CamiaoId ? (<CamiaoId>camiaoId).id.toValue() : camiaoId;

    const query = { domainId: idX}; 
    const userDocument = await this.camiaoSchema.findOne( query );

    return !!userDocument === true;
  }

  public async save (camiao: Camiao): Promise<Camiao> {
    const query = { domainId: camiao.id.toString() }; 

    const userDocument = await this.camiaoSchema.findOne( query );

    try {
      if (userDocument === null ) {
        const rawUser: any = CamiaoMap.toPersistence(camiao);

        const userCreated = await this.camiaoSchema.create(rawUser);

        return CamiaoMap.toDomain(userCreated);
      } else {
        userDocument.id = camiao.camiaoId;
      
       
        await userDocument.save();

        return camiao;
      }
    } catch (err) {
      throw err;
    }
  }


  public async findById (camiaoId: CamiaoId | string): Promise<Camiao> {

    const idX = camiaoId instanceof CamiaoId ? (<CamiaoId>camiaoId).id.toValue() : camiaoId;

    const query = { domainId: idX }; 
    const userRecord = await this.camiaoSchema.findOne( query );

    if( userRecord != null) {
      return CamiaoMap.toDomain(userRecord);
    }
    else
      return null;
  }
}