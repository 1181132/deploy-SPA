import { NetworkInterfaceBase } from "os";
import { Camiao } from "../domain/camiaoPackage/camiao";
import { Data } from "../domain/planeamentoPackage/data";

export default interface IPlaneamentoDTO {
    camiao: Camiao;
    data: Data;

  }