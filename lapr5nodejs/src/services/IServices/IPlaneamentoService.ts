import { Result } from "../../core/logic/Result";
import IPlaneamentoDTO from "../../dto/IPlaneamentoDTO";

export default interface ICamiaoService  {
  //listCamioes(): Promise<Result<ICamiaoDTO[]>>;
  createPlaneamento(planeamentoDTO: IPlaneamentoDTO): Promise<Result<IPlaneamentoDTO>>;
  //updateCamiao(camiaoDTO: ICamiaoDTO): Promise<Result<ICamiaoDTO>>;
  //getCamiao (camiaoId: string): Promise<Result<ICamiaoDTO>>;
}
