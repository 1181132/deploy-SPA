import { Service, Inject } from 'typedi';
import config from '../../config';

import { Result } from '../core/logic/Result';


import ICamiaoRepo from './IRepos/ICamiaoRepo';
import ICamiaoDTO from '../dto/ICamiaoDTO';
import { CamiaoMap } from '../mappers/CamiaoMap';
import ICamiaoService from './IServices/ICamiaoService';
import { Tara } from '../domain/camiaoPackage/tara';
import { Matricula } from '../domain/camiaoPackage/matricula';
import { CapacidadeCarga } from '../domain/camiaoPackage/capacidadeCarga';
import { CargaTotalBaterias } from '../domain/camiaoPackage/cargaTotalBaterias';
import { AutonomiaCargaMax } from '../domain/camiaoPackage/autonomiaCargaMax';
import { TempoCarregamento20ate80 } from '../domain/camiaoPackage/tempoCarregamento20ate80';
import { Camiao } from '../domain/camiaoPackage/camiao';

@Service()
export default class CamiaoService implements ICamiaoService {
  constructor(@Inject(config.repos.camiao.name) private camiaoRepo: ICamiaoRepo) {}
 
  

  
  public async listCamioes(): Promise<Result<ICamiaoDTO[]>> {
    let valor: ICamiaoDTO[] = [];
    const camioes = await this.camiaoRepo.findAll();
    camioes.forEach((camiao) => {
      valor.push(CamiaoMap.toPersistence(camiao));
    });
    return Result.ok<ICamiaoDTO[]>(valor);
  }


  public async createCamiao(truckDTO: ICamiaoDTO): Promise<Result<ICamiaoDTO>> {
    
    try {
      const tare = await Tara.create(truckDTO.tara).getValue();
      const licensePlate = await Matricula.create(truckDTO.matricula).getValue();
      const capacityCarga = await CapacidadeCarga.create(truckDTO.capacidadeCarga).getValue();
      const fullCargaBaterias = await CargaTotalBaterias.create(truckDTO.cargaTotalBaterias).getValue();
      const autonomyCargaMax = await AutonomiaCargaMax.create(truckDTO.autonomiaCargaMax).getValue();
      const timeChargingate80 = await TempoCarregamento20ate80.create(truckDTO.tempoCarregamento20ate80).getValue();
    

      const truckOrError = await Camiao.create({
        tara: tare,
        matricula: licensePlate,
        capacidadeCarga: capacityCarga,
        cargaTotalBaterias: fullCargaBaterias,
        autonomiaCargaMax: autonomyCargaMax,
        tempoCarregamento20ate80: timeChargingate80
      });

      if (truckOrError.isFailure) {
        return Result.fail<ICamiaoDTO>(truckOrError.errorValue());
      }
      
      const truckResult = truckOrError.getValue();

      await this.camiaoRepo.save(truckResult);

      const truckDTOResult = CamiaoMap.toDTO(truckResult) as ICamiaoDTO;
      return Result.ok<ICamiaoDTO>(truckDTOResult);
    } catch (e) {
      throw e;
    }
  }
  tare: Tara;
  licensePlate: Matricula;
  capacityCarga: CapacidadeCarga;
  fullCargaBaterias: CargaTotalBaterias;
  autonomyCargaMax: AutonomiaCargaMax;
  timeChargingate80: TempoCarregamento20ate80;

  public async updateCamiao(truckDTO: ICamiaoDTO): Promise<Result<ICamiaoDTO>> {
    try {
      const truck = await this.camiaoRepo.findByMatricula(truckDTO.matricula);

      if (truck === null) {
        return Result.fail<ICamiaoDTO>('Camiao not found');
      } else {
        truck.tara.value == truckDTO.tara;
        truck.matricula.value == truckDTO.matricula;
        truck.capacidadeCarga.value == truckDTO.capacidadeCarga;
        truck.cargaTotalBaterias.value== truckDTO.cargaTotalBaterias;
        truck.autonomiaCargaMax.value == truckDTO.autonomiaCargaMax;
        truck.tempoCarregamento20ate80.value == truckDTO.tempoCarregamento20ate80;

        await this.camiaoRepo.save(truck);

        const truckDTOResult = CamiaoMap.toDTO(truck) as ICamiaoDTO;
        return Result.ok<ICamiaoDTO>(truckDTOResult);
      }
    } catch (e) {
      throw e;
    }
  }
}

