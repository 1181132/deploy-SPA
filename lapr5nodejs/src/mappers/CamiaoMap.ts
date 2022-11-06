import { Mapper } from "../core/infra/Mapper";
import ICamiaoDTO from '../dto/ICamiaoDTO';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';
import { ICamiaoPersistence } from '../dataschema/ICamiaoPersistence';
import { Document, Model } from 'mongoose';
import { Camiao } from "../domain/camiaoPackage/camiao";
import { NameId } from "../domain/camiaoPackage/nameId";
import { Tara } from "../domain/camiaoPackage/tara";
import { Container } from "winston";
import { Matricula } from "../domain/camiaoPackage/matricula";
import { CapacidadeCarga } from "../domain/camiaoPackage/capacidadeCarga";
import { CargaTotalBaterias } from "../domain/camiaoPackage/cargaTotalBaterias";
import { AutonomiaCargaMax } from "../domain/camiaoPackage/autonomiaCargaMax";
import { TempoCarregamento20ate80 } from "../domain/camiaoPackage/tempoCarregamento20ate80";

export class CamiaoMap extends Mapper<Camiao> {

  public static toDTO( camiao: Camiao): ICamiaoDTO {
    return {
      //id: user.id.toString(),
      matricula: camiao.matricula,
      tara: camiao.tara,
      capacidadeCarga: camiao.capacidadeCarga,
      cargaTotalBaterias: camiao.cargaTotalBaterias,
      autonomiaCargaMax: camiao.autonomiaCargaMax,
      tempoCarregamento20ate80: camiao.tempoCarregamento20ate80,
    } as unknown as ICamiaoDTO;
  }

  public static async toDomain (raw: any): Promise<Camiao> {
    const taraOrError = Tara.create(raw.tara);
    const matriculaOrError = Matricula.create(raw.matricula);
    const capacidadeCargaOrError = CapacidadeCarga.create(raw.capacidadeCarga);
    const cargaTotalBateriasOrError = CargaTotalBaterias.create(raw.cargaTotalBaterias);
    const autonomiaCargaMaxOrError = AutonomiaCargaMax.create(raw.autonomiaCargaMax);
    const tempoCarregamento20ate80OrError = TempoCarregamento20ate80.create(raw.tempoCarregamento20ate80);

 

    const truckOrError = Camiao.create({
      tara: taraOrError.getValue(),
      matricula: matriculaOrError.getValue(),
      capacidadeCarga: capacidadeCargaOrError.getValue(),
      cargaTotalBaterias: cargaTotalBateriasOrError.getValue(),
      autonomiaCargaMax: autonomiaCargaMaxOrError.getValue(),
      tempoCarregamento20ate80: tempoCarregamento20ate80OrError.getValue()
        }, new UniqueEntityID(raw.domainId))

    truckOrError.isFailure ? console.log(truckOrError.error) : '';
    
    return truckOrError.isSuccess ? truckOrError.getValue() : null;
  }
   

  public static toPersistence (camiao: Camiao): any {
    const a = {
      domainId: camiao.id.toString(),
      matricula: camiao.matricula.value,
      tara: camiao.tara.value,
      capacidadeCarga: camiao.capacidadeCarga.value,
      cargaTotalBaterias: camiao.cargaTotalBaterias.value,
      autonomiaCargaMax: camiao.autonomiaCargaMax.value,
      tempoCarregamento20ate80: camiao.tempoCarregamento20ate80.value
    }
    return a;
  }
}