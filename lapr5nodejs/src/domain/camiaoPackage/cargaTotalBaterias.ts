import { ValueObject } from "../../core/domain/ValueObject";
import { Guard } from "../../core/logic/Guard";
import { Result } from "../../core/logic/Result";



interface CargaTotalBateriasProps {
  value: number;
}

export class CargaTotalBaterias extends ValueObject<CargaTotalBateriasProps> {
  get value (): number {
    return this.props.value;
  }
  
  private constructor (props: CargaTotalBateriasProps) {
    super(props);
  }

  public static create ( cargaTotalBaterias: number): Result<CargaTotalBaterias> {
    const guardResult = Guard.againstNullOrUndefined(cargaTotalBaterias, 'cargaTotalBaterias');
    if (!guardResult.succeeded) {
      return Result.fail<CargaTotalBaterias>(guardResult.message);
    } else {
      return Result.ok<CargaTotalBaterias>(new CargaTotalBaterias({ value: cargaTotalBaterias }))
    }
  }
}