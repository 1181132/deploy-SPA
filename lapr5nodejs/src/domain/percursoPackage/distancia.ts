import { ValueObject } from "../../core/domain/ValueObject";
import { Guard } from "../../core/logic/Guard";
import { Result } from "../../core/logic/Result";



interface DistanciaProps{
  value: number;
}

export class Distancia extends ValueObject<DistanciaProps> {
  get value (): number {
    return this.props.value;
  }
  
  private constructor (props: DistanciaProps) {
    super(props);
  }

  public static create ( distancia: number): Result<Distancia> {
    const guardResult = Guard.againstNullOrUndefined(Distancia, 'distancia');
    if (!guardResult.succeeded) {
      return Result.fail<Distancia>(guardResult.message);
    } else {
      return Result.ok<Distancia>(new Distancia({ value: distancia }))
    }
  }
}