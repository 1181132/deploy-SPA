import { Result } from "../../core/logic/Result";
import ICamiaoDTO from "../../dto/ICamiaoDTO";

export default interface ICamiaoService  {
  listCamioes(): Promise<Result<ICamiaoDTO[]>>;
  createCamiao(camiaoDTO: ICamiaoDTO): Promise<Result<ICamiaoDTO>>;
  updateCamiao(camiaoDTO: ICamiaoDTO): Promise<Result<ICamiaoDTO>>;
<<<<<<< HEAD
  getCamiao(matricula: string): Promise<Result<ICamiaoDTO>>;
  
=======
 // getCamiao (camiaoId: string): Promise<Result<ICamiaoDTO>>;
>>>>>>> 6d83eef8711ac0886f6198caed82f64167b16c00
}
