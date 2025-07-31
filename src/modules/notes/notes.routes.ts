import { RouteConfig } from "@/@types";
import { createRouter } from "@/libs";
import { createNotesController } from "./notes.controller";
import authMiddleware from "@/middlewares/auth-middleware";

const controller = createNotesController();
export const routeConfig: RouteConfig = [
  {
    path: "/",
    method: "post",
    controller: controller.store,
    middlewares: [authMiddleware.authCheck],
  },
  {
    path: "/",
    method: "get",
    controller: controller.index,
    middlewares: [authMiddleware.authCheck],
  },
  {
    path: "/:id",
    method: "put",
    controller: controller.update,
    middlewares: [authMiddleware.authCheck],
  },
  {
    path: "/:id",
    method: "get",
    controller: controller.findOne,
    middlewares: [authMiddleware.authCheck],
  },
  {
    path: "/:id",
    method: "delete",
    controller: controller.delete,
    middlewares: [authMiddleware.authCheck],
  },
];

export const notesRouter = createRouter("/notes")(routeConfig);
