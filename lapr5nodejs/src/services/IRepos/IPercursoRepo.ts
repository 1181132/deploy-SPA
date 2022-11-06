import { Repo } from "../../core/infra/Repo";
import { Percurso } from "../../domain/percurso";
import { PercursoId } from "../../domain/percursoId";

export default interface IPercursoRepo extends Repo<Percurso> {
  save(percurso: Percurso): Promise<Percurso>;
  findByDomainId (percursoId: PercursoId | string): Promise<Percurso>;
    
  //findByIds (percursosIds: PercursoId[]): Promise<Percurso[]>;
  //saveCollection (percursos: Percurso[]): Promise<Percurso[]>;
  //removeByPercursoIds (percursos: PercursoId[]): Promise<any>
}