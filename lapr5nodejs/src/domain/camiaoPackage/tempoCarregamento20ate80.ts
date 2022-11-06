import { ValueObject } from "../../core/domain/ValueObject";
import { Guard } from "../../core/logic/Guard";
import { Result } from "../../core/logic/Result";



interface TempoCarregamento20ate80Props {
  value: number;
}

export class TempoCarregamento20ate80 extends ValueObject<TempoCarregamento20ate80Props> {
  get value (): number {
    return this.props.value;
  }
  
  private constructor (props: TempoCarregamento20ate80Props) {
    super(props);
  }

  public static create ( tempoCarregamento20ate80: number): Result<TempoCarregamento20ate80> {
    const guardResult = Guard.againstNullOrUndefined(tempoCarregamento20ate80, 'tempoCarregamento20ate80');
    if (!guardResult.succeeded) {
      return Result.fail<TempoCarregamento20ate80>(guardResult.message);
    } else {
      return Result.ok<TempoCarregamento20ate80>(new TempoCarregamento20ate80({ value: tempoCarregamento20ate80 }))
    }
  }
}