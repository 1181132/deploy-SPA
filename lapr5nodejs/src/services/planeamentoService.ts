import { Service, Inject } from 'typedi';
import config from '../../config';

import { Result } from '../core/logic/Result';


//import IPlaneamentoRepo from './IRepos/IPlaneamentoRepo';
import IPlaneamentoDTO from '../dto/IPlaneamentoDTO';
import { PlaneamentoMap } from '../mappers/PlaneamentoMap';
import IPlaneamentoService from './IServices/IPlaneamentoService';

import { Planeamento } from '../domain/planeamentoPackage/planeamento';
import { Camiao } from '../domain/camiaoPackage/camiao';
import { Data } from '../domain/planeamentoPackage/data';

/**
 * Persistência não implementada
 */
@Service()
export default class PlaneamentoService implements IPlaneamentoService {
  //constructor(@Inject(config.repos.planeamento.name) private planeamentoRepo: ICamiaoRepo) { }
    

  public async createPlaneamento(planeamentoDTO: IPlaneamentoDTO): Promise<Result<IPlaneamentoDTO>> {
    /*const truckRoute = this.planeamentoRepo.findByMatricula(truckDTO.matricula);

    if ((await truckRoute) != null) {
      return Result.fail<IPlaneamentoDTO>('Truck already exists');
    }*/
    try {
      const camiao = await Camiao.create(planeamentoDTO.camiao).getValue();
      const data = await Data.create(planeamentoDTO.data.dia, planeamentoDTO.data.mes, planeamentoDTO.data.ano).getValue();
      
    

      const planeamentoOrError = await Planeamento.create({
        camiao: camiao,
        data: data
    });

      if (planeamentoOrError.isFailure) {
        return Result.fail<IPlaneamentoDTO>(planeamentoOrError.errorValue());
      }
      
      const planeamentoResult = planeamentoOrError.getValue();

     // await this.planeamentoRepo.save(truckResult);

      const planeamentoDTOResult = PlaneamentoMap.toDTO(planeamentoResult) as IPlaneamentoDTO;
      return Result.ok<IPlaneamentoDTO>(planeamentoDTOResult);
    } catch (e) {
      throw e;
    }
  }
  

  
}
