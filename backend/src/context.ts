import { DGraphConnector } from './data-loaders/dGraph/dGraphConnector';
import { Request, Response } from 'express';
export interface IContext {
  req: Request;
  res: Response;
  regDate: Date;
  dgraphConnector: DGraphConnector;
}

export function getContext(req: Request, res: Response): IContext {
  return {
    req,
    res,
    regDate: new Date(),
    dgraphConnector: new DGraphConnector(),
  };
}