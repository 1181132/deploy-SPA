import { ValueObject } from "../../core/domain/ValueObject";
import { Guard } from "../../core/logic/Guard";
import { Result } from "../../core/logic/Result";



interface AutonomiaCargaMaxProps{
  value: number;
}

export class AutonomiaCargaMax extends ValueObject<AutonomiaCargaMaxProps> {
  get value (): number {
    return this.props.value;
  }
  
  private constructor (props: AutonomiaCargaMaxProps) {
    super(props);
  }

  public static create ( autonomiaCargaMax: number): Result<AutonomiaCargaMax> {
    const guardResult = Guard.againstNullOrUndefined(autonomiaCargaMax, 'capacidadeCarga');
    if (!guardResult.succeeded) {
      return Result.fail<AutonomiaCargaMax>(guardResult.message);
    } else {
      return Result.ok<AutonomiaCargaMax>(new AutonomiaCargaMax({ value: autonomiaCargaMax }))
    }
  }
}