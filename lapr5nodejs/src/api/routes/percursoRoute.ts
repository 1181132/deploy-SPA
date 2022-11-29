import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import { Container } from 'typedi';
import config from '../../../config';
import IPercursoController from '../../controllers/IControllers/IPercursoController';

const route = Router();

export default (app: Router) => {
  app.use('/percurso', route);

  const ctrl = Container.get(config.controllers.percurso.name) as IPercursoController;


  route.post(
    '/inserir',
    celebrate({
      body: Joi.object({
        armazem1: Joi.string().required(),
        armazem2: Joi.string().required(),
        distancia: Joi.number().required().greater(0),
        tempo: Joi.number().required().greater(0),
        energia: Joi.number().required().greater(0),
        cargaExtra: Joi.number().required().greater(0),

      }),
    }),
    (req,res,next) => ctrl.createPercurso(req,res,next)
  );

  route.get(
    '/listar',
    (req, res, next) => ctrl.listPercursos(req, res, next));

  route.put(
    '/update',
    celebrate({
      body: Joi.object({
        armazem1: Joi.number().required().greater(0),
        armazem2: Joi.number().required().greater(0),
        distancia: Joi.number().required().greater(0),
        tempo: Joi.number().required().greater(0),
        energia: Joi.number().required().greater(0),
        cargaExtra: Joi.number().required().greater(0),
      }),
    }),
    (req,res,next) => ctrl.updatePercurso(req,res,next)
  );

  
};
