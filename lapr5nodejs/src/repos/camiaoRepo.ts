import { Service, Inject } from 'typedi';

import { Document, FilterQuery, Model } from 'mongoose';
import ICamiaoRepo from '../services/IRepos/ICamiaoRepo';
import { ICamiaoPersistence } from '../dataschema/ICamiaoPersistence';
import { CamiaoId } from '../domain/camiaoPackage/camiaoId';
import { Camiao } from '../domain/camiaoPackage/camiao';
import { CamiaoMap } from '../mappers/CamiaoMap';
import { Matricula } from '../domain/camiaoPackage/matricula';

@Service()
export default class CamiaoRepo implements ICamiaoRepo {
  private models: any;

  constructor(
    @Inject('camiaoSchema') private camiaoSchema: Model<ICamiaoPersistence & Document>,
  ) { }
  
  public async exists(truckId: CamiaoId | string): Promise<boolean> {
    const idX = truckId instanceof CamiaoId ? (<CamiaoId>truckId).id.toValue() : truckId;

    const query = { domainId: idX };
    const userDocument = await this.camiaoSchema.findOne(query);

    return !!userDocument === true;
  }

  private createBaseQuery(): any {
    return {
      where: {},
    }
  }

  public async save(truck: Camiao): Promise<Camiao> {
    const query = { domainId: truck.id.toString() };

    const truckDocument = await this.camiaoSchema.findOne(query);

    try {
      if (truckDocument === null) {
        const rawTruck: any = CamiaoMap.toPersistence(truck);

        const truckCreated = await this.camiaoSchema.create(rawTruck);

        return CamiaoMap.toDomain(truckCreated);
      } else {
        truckDocument.id = truck.id.toString();
        truckDocument.tara = truck.tara.props.value;
        truckDocument.matricula = truck.matricula.props.value;
        truckDocument.capacidadeCarga = truck.capacidadeCarga.props.value;
        truckDocument.cargaTotalBaterias = truck.cargaTotalBaterias.props.value;
        truckDocument.autonomiaCargaMax = truck.autonomiaCargaMax.props.value;
        truckDocument.tempoCarregamento20ate80 = truck.tempoCarregamento20ate80.props.value;
        await truckDocument.save();

        return truck;
      }
    } catch (err) {
      throw err;
    }
  }


  public async findByMatricula(matricula: Matricula): Promise<Camiao> {

    const camiaoList = this.findAll();
    var finalCamiao = null;
    (await camiaoList).forEach((element)=> {
      if (matricula.value.localeCompare(element.matricula.value) == 0) {
        finalCamiao => element;
      }
    })
    return finalCamiao;
  }
  
  public async findById(camiaoId: CamiaoId): Promise<Camiao> {

    const camiaoList = this.findAll();
    var finalCamiao = null;
    (await camiaoList).forEach((element)=> {
      if (camiaoId.id.equals(element.camiaoId.id)) {
        finalCamiao => element;
      }
    })
    return finalCamiao;
  }

  
  
  
  public async findAll(): Promise<Camiao[]> {
    try{
      const routesRecord = await this.camiaoSchema.find();
      var list:Camiao[]=[];
      if(routesRecord != null){
        routesRecord.forEach(async element => {
          list.push(await CamiaoMap.toDomain(element))
        })
        return list;
      }
    } catch(e){
      throw e;
    }
    return null;
  }

} 