import { ValueObject } from "../../core/domain/ValueObject";
import { Guard } from "../../core/logic/Guard";
import { Result } from "../../core/logic/Result";



interface DataProps{
  dia: number;
  mes: number;
  ano: number;
}

export class Data extends ValueObject<DataProps> {
  get dia (): number {
    return this.props.dia;
  }

  get mes (): number {
    return this.props.mes;
  }

  get ano (): number {
    return this.props.ano;
  }
  
  private constructor (props: DataProps) {
    super(props);
  }

  public static create ( dia: number, mes: number, ano: number): Result<Data> {
    const guardResult = Guard.againstNullOrUndefined(Data, 'data');
    if (!guardResult.succeeded) {
      return Result.fail<Data>(guardResult.message);
    } else {
      return Result.ok<Data>(new Data({ dia: dia, mes: mes, ano: ano }))
    }
  }
}