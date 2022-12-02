import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";
import { Result } from "../core/logic/Result";
import { Matricula } from '../domain/camiaoPackage/matricula';
import ICamiaoDTO from '../dto/ICamiaoDTO';
import { CamiaoMap } from '../mappers/CamiaoMap';
import ICamiaoService from '../services/IServices/ICamiaoService';
import ICamiaoController from './IControllers/ICamiaoController';

@Service()
export default class CamiaoController implements ICamiaoController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
      @Inject(config.services.camiao.name) private camiaoServiceInstance : ICamiaoService
  ) {}

  public async createCamiao(req: Request, res: Response, next: NextFunction) {
    try {
      const camiaoOrError = await this.camiaoServiceInstance.createCamiao(req.body as ICamiaoDTO) as Result<ICamiaoDTO>;
        
      if (camiaoOrError.isFailure) {
        return res.status(402).send();
      }

      const camiaoDTO = camiaoOrError.getValue();
      return res.json( camiaoDTO ).status(201);
    }
    catch (e) {
      return next(e);
    }
  };

  public async getCamiao(req: Request, res: Response, next: NextFunction) {
    try {
      const camiaoOrError = await this.camiaoServiceInstance.getCamiao(req.body) as Result<ICamiaoDTO>;
      
      if (camiaoOrError.isFailure) {
        return res.status(402).send();
      }
      return res.json( camiaoOrError ).status(201);
    }
    catch (e) {
      return next(e);
    }
  };

  public async listCamioes(req: Request, res: Response, next: NextFunction) {
    try {
      const camioesOrError = (await this.camiaoServiceInstance.listCamioes()) as Result<ICamiaoDTO[]>;
      if (camioesOrError.isFailure)
      {
        return res.status(402).send();
      } const camioesDTO = camioesOrError.getValue();
      return res.json(camioesDTO).status(201);
    } catch (e) { return next(e); }
  }

  
  public async updateCamiao(req: Request, res: Response, next: NextFunction) {
    try {
      const camiaoOrError = await this.camiaoServiceInstance.updateCamiao(req.body as ICamiaoDTO) as Result<ICamiaoDTO>;

      if (camiaoOrError.isFailure) {
        return res.status(404).json(camiaoOrError.error);
      }

      const camiaoDTO = camiaoOrError.getValue();
      return res.status(202).json( camiaoDTO );
    }
    catch (e) {
      return next(e);
    }
  };
}