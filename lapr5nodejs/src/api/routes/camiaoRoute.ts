import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import { Container } from 'typedi';
import config from '../../../config';
import ICamiaoController from '../../controllers/IControllers/ICamiaoController';

const route = Router();

export default (app: Router) => {
  app.use('/camiao', route);

  const ctrl = Container.get(config.controllers.camiao.name) as ICamiaoController;


  route.post(
    '/inserir',
    celebrate({
      body: Joi.object({
        tara: Joi.number().required(),
        matricula: Joi.string().required(),
        capacidadeCarga: Joi.number().required(),
        cargaTotalBaterias: Joi.number().required(),
        autonomiaCargaMax: Joi.number().required(),
        tempoCarregamento20ate80: Joi.number().required()
      }),
    }),
    (req,res,next) => ctrl.createCamiao(req,res,next)
  );

  route.put(
    '/update',
    celebrate({
      body: Joi.object({
        tara: Joi.number().required(),
        matricula: Joi.string().required(),
        capacidadeCarga: Joi.number().required(),
        cargaTotalBaterias: Joi.number().required(),
        autonomiaCargaMax: Joi.number().required(),
        tempoCarregamento20ate80: Joi.number().required()
      }),
    }),
    (req,res,next) => ctrl.updateCamiao(req,res,next)
  );

  
};
