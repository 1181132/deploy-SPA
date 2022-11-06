import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Guard } from "../../core/logic/Guard";

import { Result } from "../../core/logic/Result";

import { AutonomiaCargaMax } from "./autonomiaCargaMax";
import { CamiaoId } from "./camiaoId";
import { CapacidadeCarga } from "./capacidadeCarga";
import { CargaTotalBaterias } from "./cargaTotalBaterias";
import { Matricula } from "./matricula";
import { Tara } from "./tara";
import { TempoCarregamento20ate80 } from "./tempoCarregamento20ate80";

interface CamiaoProps {
    tara: Tara;
    matricula: Matricula;
    capacidadeCarga: CapacidadeCarga;
    cargaTotalBaterias: CargaTotalBaterias;
    autonomiaCargaMax: AutonomiaCargaMax;
    tempoCarregamento20ate80: TempoCarregamento20ate80;
}

export class Camiao extends AggregateRoot<CamiaoProps> {
  get id (): UniqueEntityID {
    return this._id;
  }

  get camiaoId (): CamiaoId{
    return CamiaoId.caller(this.id)
  } 

  get tara (): Tara{
    return this.props.tara;
  }
  
  get matricula (): Matricula{
    return this.props.matricula;
  }

  get capacidadeCarga (): CapacidadeCarga{
    return this.props.capacidadeCarga;
  }

  get cargaTotalBaterias (): CargaTotalBaterias{
    return this.props.cargaTotalBaterias;
  } 

  get autonomiaCargaMax (): AutonomiaCargaMax{
    return this.props.autonomiaCargaMax;
  }

  get tempoCarregamento20ate80 (): TempoCarregamento20ate80{
    return this.props.tempoCarregamento20ate80;
  }

  private constructor (props: CamiaoProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (props: CamiaoProps, id?: UniqueEntityID): Result<Camiao> {

    const truckProps = [

      { argument: props.tara, argumentName: 'tara' },
      { argument: props.matricula, argumentName: 'matricula' },
      { argument: props.capacidadeCarga, argumentName: 'capacidadeCarga' },
      { argument: props.cargaTotalBaterias, argumentName: 'cargaTotalBaterias'},
      { argument: props.autonomiaCargaMax, argumentName: 'autonomiaCargaMax'},
      { argument: props.tempoCarregamento20ate80, argumentName: 'tempoCarregamento20ate80'}
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(truckProps);

    if (!guardResult.succeeded) {
      return Result.fail<Camiao>(guardResult.message)
    }     
    else {
      const user = new Camiao({
        ...props
      }, id);

      return Result.ok<Camiao>(user);
    }
  }
}
