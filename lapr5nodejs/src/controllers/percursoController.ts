import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";
import { Result } from "../core/logic/Result";
import IPercursoDTO from '../dto/IPercursoDTO';
import IPercursoService from '../services/IServices/IPercursoService';
import IPercursoController from './IControllers/IPercursoController';

@Service()
export default class PercursoController implements IPercursoController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
      @Inject(config.services.percurso.name) private percursoServiceInstance : IPercursoService
  ) {}

  public async createPercurso(req: Request, res: Response, next: NextFunction) {
    try {
      const percursoOrError = await this.percursoServiceInstance.createPercurso(req.body as IPercursoDTO) as Result<IPercursoDTO>;
        
      if (percursoOrError.isFailure) {
        return res.status(402).send();
      }

      const percursoDTO = percursoOrError.getValue();
      return res.json( percursoDTO ).status(201);
    }
    catch (e) {
      return next(e);
    }
  };

  public async listPercursos(req: Request, res: Response, next: NextFunction) {
    try {
      const percursosOrError = (await this.percursoServiceInstance.listPercursos()) as Result<IPercursoDTO[]>;
      if (percursosOrError.isFailure)
      {
        return res.status(402).send();
      } const percursosDTO = percursosOrError.getValue();
      return res.json(percursosDTO).status(201);
    } catch (e) { return next(e); }
  }

  
  public async updatePercurso(req: Request, res: Response, next: NextFunction) {
    try {
      const percursoOrError = await this.percursoServiceInstance.updatePercurso(req.body as IPercursoDTO) as Result<IPercursoDTO>;

      if (percursoOrError.isFailure) {
        return res.status(404).send();
      }

      const percursoDTO = percursoOrError.getValue();
      return res.status(201).json( percursoDTO );
    }
    catch (e) {
      return next(e);
    }
  };
}