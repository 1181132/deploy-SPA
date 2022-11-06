import { NetworkInterfaceBase } from "os";

export default interface ICamiaoDTO {
    id: string
    tara: number;
    matricula: string;
    capacidadeCarga: number;
    cargaTotalBaterias: number;
    autonomiaCargaMax: number;
    tempoCarregamento20ate80: number;

  }
  