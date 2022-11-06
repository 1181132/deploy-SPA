import { Result } from "../../core/logic/Result";
import IPercursoDTO from "../../dto/IPercursoDTO";

export default interface IPercursoService  {
  createPercurso(percursoDTO: IPercursoDTO): Promise<Result<IPercursoDTO>>;
  updatePercurso(percursoDTO: IPercursoDTO): Promise<Result<IPercursoDTO>>;
  listPercursos(): Promise<Result<IPercursoDTO[]>>;
  //getPercurso (percursoId: string): Promise<Result<IPercursoDTO>>;
}
