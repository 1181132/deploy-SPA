import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";

import { Result } from "../../core/logic/Result";
import { PercursoId } from "./percursoId";

import IPercursoDTO from "../../dto/IPercursoDTO";
import { Distancia } from "./distancia";
import { CargaExtra } from "./cargaExtra";
import { Tempo } from "./tempo";
import { Energia } from "./energia";
import { Armazem1 } from "./armazem1";
import { Armazem2 } from "./armazem2";
import { Guard } from "../../core/logic/Guard";

interface PercursoProps {
  armazem1: Armazem1;
  armazem2: Armazem2;
  distancia: Distancia;
  tempo: Tempo;
  energia: Energia;
  cargaExtra: CargaExtra;
}

export class Percurso extends AggregateRoot<PercursoProps> {
  get id (): UniqueEntityID {
    return this._id;
  }

  get percursoId (): PercursoId {
    return new PercursoId(this.percursoId.toValue());
  }

  get armazem1 (): Armazem1 {
    return this.props.armazem1;
  }

  get armazem2 (): Armazem2 {
    return this.props.armazem2;
  }

  get distancia (): Distancia {
    return this.props.distancia;
  }

  get tempo (): Tempo {
    return this.props.tempo;
  }

  get energia (): Energia {
    return this.props.energia;
  }

  get cargaExtra (): CargaExtra {
    return this.props.cargaExtra;
  }

  /*set distancia ( value: number) {
    this.props.distancia = value;
  }*/ 

  /*set tempo ( value: number) {
    this.props.tempo = value;
  }*/

  /*set energia ( value: number) {
    this.props.energia = value;
  }*/

 /* set cargaExtra ( value: number) {
    this.props.cargaExtra = value;
  }*/

  

  private constructor (props: PercursoProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (props: PercursoProps, id?: UniqueEntityID): Result<Percurso> {

    const percursoProps = [
      { argument: props.armazem1, argumentName: 'armazem1'},
      { argument: props.armazem2,argumentName: 'armazem2'},
      { argument: props.cargaExtra, argumentName: 'cargaExtra'},
      { argument: props.distancia, argumentName: 'distancia'},
      { argument: props.energia, argumentName: 'energia'},
      { argument: props.tempo, argumentName: 'tempo'},
      
    ]
    const guardResult = Guard.againstNullOrUndefinedBulk(percursoProps);

    if (!guardResult.succeeded) {
      return Result.fail<Percurso>(guardResult.message)
    }     
    else {
      const user = new Percurso({
        ...props
      }, id);

      return Result.ok<Percurso>(user);
    }
  }
}
