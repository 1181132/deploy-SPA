import { Result } from "../../core/logic/Result";
import ICamiaoDTO from "../../dto/ICamiaoDTO";

export default interface ICamiaoService  {
  listCamioes(): Promise<Result<ICamiaoDTO[]>>;
  createCamiao(camiaoDTO: ICamiaoDTO): Promise<Result<ICamiaoDTO>>;
  updateCamiao(camiaoDTO: ICamiaoDTO): Promise<Result<ICamiaoDTO>>;
  getCamiao(matricula: string): Promise<Result<ICamiaoDTO>>;
}
