import { ValueObject } from "../../core/domain/ValueObject";
import { Guard } from "../../core/logic/Guard";
import { Result } from "../../core/logic/Result";



interface TempoProps{
  value: number;
}

export class Tempo extends ValueObject<TempoProps> {
  get value (): number {
    return this.props.value;
  }
  
  private constructor (props: TempoProps) {
    super(props);
  }

  public static create ( tempo: number): Result<Tempo> {
    const guardResult = Guard.againstNullOrUndefined(Tempo, 'tempo');
    if (!guardResult.succeeded) {
      return Result.fail<Tempo>(guardResult.message);
    } else {
      return Result.ok<Tempo>(new Tempo({ value: tempo }))
    }
  }
}