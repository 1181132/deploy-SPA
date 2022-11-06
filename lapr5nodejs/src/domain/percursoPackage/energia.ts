import { ValueObject } from "../../core/domain/ValueObject";
import { Guard } from "../../core/logic/Guard";
import { Result } from "../../core/logic/Result";



interface EnergiaProps{
  value: number;
}

export class Energia extends ValueObject<EnergiaProps> {
  get value (): number {
    return this.props.value;
  }
  
  private constructor (props: EnergiaProps) {
    super(props);
  }

  public static create ( energia: number): Result<Energia> {
    const guardResult = Guard.againstNullOrUndefined(Energia, 'energia');
    if (!guardResult.succeeded) {
      return Result.fail<Energia>(guardResult.message);
    } else {
      return Result.ok<Energia>(new Energia({ value: energia }))
    }
  }
}