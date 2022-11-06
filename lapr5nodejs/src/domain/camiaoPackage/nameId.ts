import { ValueObject } from "../../core/domain/ValueObject";
import { Guard } from "../../core/logic/Guard";
import { Result } from "../../core/logic/Result";

interface NameIdProps {
  value: string;
}

export class NameId extends ValueObject<NameIdProps> {
  get value (): string {
    return this.props.value;
  }
  
  private constructor (props: NameIdProps) {
    super(props);
  }

  public static create (nameId: string): Result<NameId> {
    const guardResult = Guard.againstNullOrUndefined(nameId, 'nameId');
    if (!guardResult.succeeded) {
      return Result.fail<NameId>(guardResult.message);
    } else {
      return Result.ok<NameId>(new NameId({ value: nameId }))
    }
  }
}