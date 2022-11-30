import { ValueObject } from "../../core/domain/ValueObject";
import { Guard } from "../../core/logic/Guard";
import { Result } from "../../core/logic/Result";



interface Armazem1Props{
  value: number;
}

export class Armazem1 extends ValueObject<Armazem1Props> {
  get value (): number {
    return this.props.value;
  }
  
  private constructor (props: Armazem1Props) {
    super(props);
  }

  public static create ( armazem: number): Result<Armazem1> {
    const guardResult = Guard.againstNullOrUndefined(Armazem1, 'capacidadeCarga');
    if (!guardResult.succeeded) {
      return Result.fail<Armazem1>(guardResult.message);
    } else {
      return Result.ok<Armazem1>(new Armazem1({ value: armazem }))
    }
  }
}