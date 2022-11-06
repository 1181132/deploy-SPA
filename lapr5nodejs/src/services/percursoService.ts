import { Service, Inject } from 'typedi';
import config from "../../config";
import IPercursoDTO from '../dto/IPercursoDTO';
import { Percurso } from "../domain/percursoPackage/percurso";
import IPercursoRepo from '../services/IRepos/IPercursoRepo';
import IPercursoService from './IServices/IPercursoService';
import { Result } from "../core/logic/Result";
import { PercursoMap } from "../mappers/PercursoMap";
import { Distancia } from '../domain/percursoPackage/distancia';
import { CargaExtra } from '../domain/percursoPackage/cargaExtra';
import { Energia } from '../domain/percursoPackage/energia';
import { Tempo } from '../domain/percursoPackage/tempo';
import { Armazem1 } from '../domain/percursoPackage/armazem1';
import { Armazem2 } from '../domain/percursoPackage/armazem2';

@Service()
export default class PercursoService implements IPercursoService {
  constructor(
      @Inject(config.repos.percurso.name) private percursoRepo : IPercursoRepo
  ) {}

  /*public async getPercurso( percursoId: string): Promise<Result<IPercursoDTO>> {
    try {
      const percurso = await this.percursoRepo.findByArmazens;

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
  }*/

  public async listPercursos(): Promise<Result<IPercursoDTO[]>> {
    let valor: IPercursoDTO[] = [];
    const percursos = await this.percursoRepo.findAll();
    percursos.forEach((percurso) => {
      valor.push(PercursoMap.toPersistence(percurso));
    });
    return Result.ok<IPercursoDTO[]>(valor);
  }


  public async createPercurso(percursoDTO: IPercursoDTO): Promise<Result<IPercursoDTO>> {
    const percursoRoute = this.percursoRepo.findByArmazens(percursoDTO.armazem1, percursoDTO.armazem2);

    if ((await percursoRoute) != null) {
      return Result.fail<IPercursoDTO>('Percurso ja existe');
    }
    try {
      const armazem1 = await Armazem1.create(percursoDTO.armazem1).getValue();
      const armazem2 = await Armazem2.create(percursoDTO.armazem2).getValue();
      const distancia = await Distancia.create(percursoDTO.distancia).getValue();
      const tempo = await Tempo.create(percursoDTO.tempo).getValue();
      const cargaExtra = await CargaExtra.create(percursoDTO.cargaExtra).getValue();
      const energia = await Energia.create(percursoDTO.energia).getValue();
      

      const percursoOrError = await Percurso.create({
        armazem1: armazem1,
        armazem2: armazem2,
        distancia: distancia,
        tempo: tempo,
        cargaExtra: cargaExtra,
        energia: energia
      });

      if (percursoOrError.isFailure) {
        return Result.fail<IPercursoDTO>(percursoOrError.errorValue());
      }
      
      const percursoResult = percursoOrError.getValue();

      await this.percursoRepo.save(percursoResult);

      const percursoDTOResult = PercursoMap.toDTO(percursoResult) as IPercursoDTO;
      return Result.ok<IPercursoDTO>(percursoDTOResult);
    } catch (e) {
      throw e;
    }
  }

  public async updatePercurso(percursoDTO: IPercursoDTO): Promise<Result<IPercursoDTO>> {
    try {
      const percurso = await this.percursoRepo.findByArmazens(percursoDTO.armazem1,percursoDTO.armazem2);


      if (percurso === null) {
        return Result.fail<IPercursoDTO>("Percurso not found");
      }
      else {
        const distancia = await Distancia.create(percursoDTO.distancia);
        const cargaExtra = await CargaExtra.create(percursoDTO.cargaExtra);
        const energia = await Energia.create(percursoDTO.energia);
        const tempo =await Tempo.create(percursoDTO.tempo);

        percurso.props.distancia = distancia.getValue();
        percurso.props.cargaExtra = cargaExtra.getValue();
        percurso.props.energia = energia.getValue();
        percurso.props.tempo = tempo.getValue();
        await this.percursoRepo.save(percurso);

        const percursoDTOResult = PercursoMap.toDTO( percurso ) as IPercursoDTO;
        return Result.ok<IPercursoDTO>( percursoDTOResult )
        }
    } catch (e) {
      throw e;
    }
  }

}
