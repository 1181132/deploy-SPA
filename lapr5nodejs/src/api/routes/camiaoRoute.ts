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
        tara: Joi.number().required().greater(0),
        matricula: Joi.string().required().regex(/([A-Z]{2}-[0-9]{2}-[0-9]{2})|([0-9]{2}-[A-Z]{2}-[0-9]{2})|([0-9]{2}-[0-9]{2}-[A-Z]{2})|([A-Z]{2}-[0-9]{2}-[A-Z]{2})/),
        capacidadeCarga: Joi.number().required().greater(0),
        cargaTotalBaterias: Joi.number().required().greater(0),
        autonomiaCargaMax: Joi.number().required().greater(0),
        tempoCarregamento20ate80: Joi.number().required().greater(0)
      }),
    }),
    (req,res,next) => ctrl.createCamiao(req,res,next)
  );

  route.get(
    '/listar',
    (req, res, next) => ctrl.listCamioes(req, res, next));
/* 
    route.get(
      '/matricula',
      (req, res, next) => ctrl.getCamiao(req, res, next));
  
 */
  route.put(
    '/update',
    celebrate({
      body: Joi.object({
        tara: Joi.number().required().greater(0),
        matricula: Joi.string().required(),
        capacidadeCarga: Joi.number().required().greater(0),
        cargaTotalBaterias: Joi.number().required().greater(0),
        autonomiaCargaMax: Joi.number().required().greater(0),
        tempoCarregamento20ate80: Joi.number().required().greater(0)
      }),
    }),
    (req,res,next) => ctrl.updateCamiao(req,res,next)
  );
  
    
    
  
};
