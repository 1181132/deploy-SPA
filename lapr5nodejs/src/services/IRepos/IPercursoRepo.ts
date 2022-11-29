import { Repo } from "../../core/infra/Repo";
import { Percurso } from "../../domain/percursoPackage/percurso";
import { PercursoId } from "../../domain/percursoPackage/percursoId";

export default interface IPercursoRepo extends Repo<Percurso> {
  save(percurso: Percurso): Promise<Percurso>;
  findByArmazens (armazem1: string, armazem2: string): Promise<Percurso>;
  findAll(): Promise<Percurso[]>;

  //findByArmazem1 (armazem1: number): Promise<Percurso>;
  //findByArmazem2 (armazem1: number): Promise<Percurso>; 
  //findByIds (percursosIds: PercursoId[]): Promise<Percurso[]>;
  //saveCollection (percursos: Percurso[]): Promise<Percurso[]>;
  //removeByPercursoIds (percursos: PercursoId[]): Promise<any>
}