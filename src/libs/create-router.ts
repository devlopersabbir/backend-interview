import { Request, Response, Router, NextFunction } from "express";

export type HttpMethod = "get" | "post" | "put" | "delete";

const defaultMiddlewareFn = (
  _req: Request,
  _res: Response,
  next: NextFunction
) => {
  next();
};

type ControllerFunction = (
  req: Request extends { body: infer T } ? T : Request,
  res: Response,
  next?: any extends NextFunction ? any : NextFunction
) => void;

type MiddlewareFunction = typeof defaultMiddlewareFn;

// type for route configuration
export interface IRouteConfig {
  path: string;
  method: HttpMethod;
  controller: ControllerFunction;
  middlewares?: MiddlewareFunction[];
}

// type for the createRouter function
export const createRouter = (
  basePath = "/",
  ...globalMiddlewares: MiddlewareFunction[]
) => {
  const router = Router();

  return (routeConfig: IRouteConfig[]) => {
    const GLOBAL_MIDDLEWARES = globalMiddlewares.length
      ? globalMiddlewares
      : [defaultMiddlewareFn];
    router.use(basePath, ...GLOBAL_MIDDLEWARES);

    routeConfig.forEach(
      ({ path, method, controller, middlewares = [] }: IRouteConfig) => {
        const middlewaresToUse = middlewares.length
          ? middlewares
          : [defaultMiddlewareFn];
        router[method](
          basePath.trim() + path.trim(),
          ...middlewaresToUse,
          controller
        );
      }
    );

    return router;
  };
};
