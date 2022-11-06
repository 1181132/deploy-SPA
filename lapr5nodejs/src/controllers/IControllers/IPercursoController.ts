import { Request, Response, NextFunction } from 'express';

export default interface IPercursoController  {
  createPercurso(req: Request, res: Response, next: NextFunction);
  updatePercurso(req: Request, res: Response, next: NextFunction);
  listPercursos(req: Request, res: Response, next: NextFunction);

}