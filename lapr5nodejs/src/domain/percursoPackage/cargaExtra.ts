import { ValueObject } from "../../core/domain/ValueObject";
import { Guard } from "../../core/logic/Guard";
import { Result } from "../../core/logic/Result";



interface CargaExtraProps{
  value: number;
}

export class CargaExtra extends ValueObject<CargaExtraProps> {
  get value (): number {
    return this.props.value;
  }
  
  private constructor (props: CargaExtraProps) {
    super(props);
  }

  public static create ( cargaExtra: number): Result<CargaExtra> {
    const guardResult = Guard.againstNullOrUndefined(CargaExtra, 'capacidadeCarga');
    if (!guardResult.succeeded) {
      return Result.fail<CargaExtra>(guardResult.message);
    } else {
      return Result.ok<CargaExtra>(new CargaExtra({ value: cargaExtra }))
    }
  }
}