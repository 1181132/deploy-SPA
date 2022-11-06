import { ValueObject } from "../../core/domain/ValueObject";
import { Guard } from "../../core/logic/Guard";
import { Result } from "../../core/logic/Result";



interface Armazem2Props{
  value: number;
}

export class Armazem2 extends ValueObject<Armazem2Props> {
  get value (): number {
    return this.props.value;
  }
  
  private constructor (props: Armazem2Props) {
    super(props);
  }

  public static create ( armazem: number): Result<Armazem2> {
    const guardResult = Guard.againstNullOrUndefined(Armazem2, 'capacidadeCarga');
    if (!guardResult.succeeded) {
      return Result.fail<Armazem2>(guardResult.message);
    } else {
      return Result.ok<Armazem2>(new Armazem2({ value: armazem }))
    }
  }
}