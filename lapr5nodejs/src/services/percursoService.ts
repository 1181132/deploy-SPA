import { Service, Inject } from 'typedi';
import config from "../../config";
import IPercursoDTO from '../dto/IPercursoDTO';
import { Percurso } from "../domain/percurso";
import IPercursoRepo from '../services/IRepos/IPercursoRepo';
import IPercursoService from './IServices/IPercursoService';
import { Result } from "../core/logic/Result";
import { PercursoMap } from "../mappers/PercursoMap";

@Service()
export default class PercursoService implements IPercursoService {
  constructor(
      @Inject(config.repos.percurso.name) private percursoRepo : IPercursoRepo
  ) {}

  public async getPercurso( percursoId: string): Promise<Result<IPercursoDTO>> {
    try {
      const percurso = await this.percursoRepo.findByDomainId(percursoId);

      if (percurso === null) {
        return Result.fail<IPercursoDTO>("Percurso not found");
      }
      else {
        const percursoDTOResult = PercursoMap.toDTO( percurso ) as IPercursoDTO;
        return Result.ok<IPercursoDTO>( percursoDTOResult )
        }
    } catch (e) {
      throw e;
    }
  }


  public async createPercurso(percursoDTO: IPercursoDTO): Promise<Result<IPercursoDTO>> {
    try {

      const percursoOrError = await Percurso.create( percursoDTO );

      if (percursoOrError.isFailure) {
        return Result.fail<IPercursoDTO>(percursoOrError.errorValue());
      }

      const percursoResult = percursoOrError.getValue();

      await this.percursoRepo.save(percursoResult);

      const percursoDTOResult = PercursoMap.toDTO( percursoResult ) as IPercursoDTO;
      return Result.ok<IPercursoDTO>( percursoDTOResult )
    } catch (e) {
      throw e;
    }
  }

  public async updatePercurso(percursoDTO: IPercursoDTO): Promise<Result<IPercursoDTO>> {
    try {
      const percurso = await this.percursoRepo.findByDomainId(percursoDTO.id);


      if (percurso === null) {
        return Result.fail<IPercursoDTO>("Percurso not found");
      }
      else {
        percurso.distancia = percursoDTO.distancia;
        percurso.cargaExtra = percursoDTO.cargaExtra;
        percurso.energia = percursoDTO.energia;
        percurso.tempo = percursoDTO.tempo;
        await this.percursoRepo.save(percurso);

        const percursoDTOResult = PercursoMap.toDTO( percurso ) as IPercursoDTO;
        return Result.ok<IPercursoDTO>( percursoDTOResult )
        }
    } catch (e) {
      throw e;
    }
  }

}
