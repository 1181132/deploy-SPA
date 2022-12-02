import { Request, Response, NextFunction } from 'express';

export default interface ICamiaoController  {
  createCamiao(req: Request, res: Response, next: NextFunction);
  updateCamiao(req: Request, res: Response, next: NextFunction);
  listCamioes(req: Request, res: Response, next: NextFunction);
<<<<<<< HEAD
  getCamiao(req: Request, res: Response, next: NextFunction);
=======

>>>>>>> 6d83eef8711ac0886f6198caed82f64167b16c00
}