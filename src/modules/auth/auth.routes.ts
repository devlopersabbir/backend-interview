import { RouteConfig } from "@/@types";
import { createRouter } from "@/libs";
import { createAuthController } from "./auth.controller";

const controller = createAuthController();
export const routeConfig: RouteConfig = [
  {
    path: "/login",
    method: "post",
    controller: controller.login,
    middlewares: [],
  },
  {
    path: "/register",
    method: "post",
    controller: controller.register,
    middlewares: [],
  },
];

export const authRouter = createRouter("/users")(routeConfig);
