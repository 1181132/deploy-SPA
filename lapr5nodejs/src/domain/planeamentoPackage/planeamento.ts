import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";

import { Result } from "../../core/logic/Result";
import { PlaneamentoId } from "./planeamentoId";

import IPlaneamentoDTO from "../../dto/IPlaneamentoDTO";

import { Data } from "./data";
import { Guard } from "../../core/logic/Guard";
import { Camiao } from "../camiaoPackage/camiao";


interface PlaneamentoProps {
    camiao: Camiao;
    data: Data;

}

export class Planeamento extends AggregateRoot<PlaneamentoProps> {
    get id(): UniqueEntityID {
        return this._id;
    }

    get planeamentoId(): PlaneamentoId {
        return PlaneamentoId.caller(this.id);
    }

    get camiao(): Camiao {
        return this.props.camiao;
    }

    get data(): Data {
        return this.props.data;
    }


    private constructor(props: PlaneamentoProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(props: PlaneamentoProps, id?: UniqueEntityID): Result<Planeamento> {

        const planeamentoProps = [
            { argument: props.camiao, argumentName: 'camiao' },
            { argument: props.data, argumentName: 'data' }
        ]
        const guardResult = Guard.againstNullOrUndefinedBulk(planeamentoProps);

        if (!guardResult.succeeded) {
            return Result.fail<Planeamento>(guardResult.message)
        }
        else {
            const user = new Planeamento({
                ...props
            }, id);

            return Result.ok<Planeamento>(user);
        }
    }
}
