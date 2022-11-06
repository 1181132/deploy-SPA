import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { Result } from "../core/logic/Result";
import { PercursoId } from "./percursoId";

import IPercursoDTO from "../dto/IPercursoDTO";

interface PercursoProps {
  armazem1: number;
  armazem2: number;
  distancia: number;
  tempo: number;
  energia: number;
  cargaExtra: number;
}

export class Percurso extends AggregateRoot<PercursoProps> {
  get id (): UniqueEntityID {
    return this._id;
  }

  get percursoId (): PercursoId {
    return new PercursoId(this.percursoId.toValue());
  }

  get armazem1 (): number {
    return this.props.armazem1;
  }

  get armazem2 (): number {
    return this.props.armazem2;
  }

  get distancia (): number {
    return this.props.distancia;
  }
  
  set distancia ( value: number) {
    this.props.distancia = value;
  }

  get tempo (): number {
    return this.props.tempo;
  }

  set tempo ( value: number) {
    this.props.tempo = value;
  }

  get energia (): number {
    return this.props.energia;
  }

  set energia ( value: number) {
    this.props.energia = value;
  }

  get cargaExtra (): number {
    return this.props.cargaExtra;
  }

  set cargaExtra ( value: number) {
    this.props.cargaExtra = value;
  }

  
// por gets e sets

  private constructor (props: PercursoProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (percursoDTO: IPercursoDTO, id?: UniqueEntityID): Result<Percurso> {
    const armazem1 = percursoDTO.armazem1;
    const armazem2 = percursoDTO.armazem2;
    const distancia = percursoDTO.distancia;
    const tempo = percursoDTO.tempo;
    const energia = percursoDTO.energia;
    const cargaExtra = percursoDTO.cargaExtra;

    if (distancia === 0 || tempo === 0 || energia === 0 || cargaExtra === 0 ) {
      return Result.fail<Percurso>('Parametros invalidos')
    } else {
      const percurso = new Percurso({armazem1: armazem1, armazem2: armazem2, distancia: distancia, tempo: tempo, energia: energia, cargaExtra: cargaExtra}, id);
      return Result.ok<Percurso>( percurso )
    }
  }
}
