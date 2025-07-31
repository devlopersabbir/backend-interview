import { Request, Response } from "express";
import { userSchema } from "./user.dto";
import { getZodError } from "@/utils/zod.utils";
import { sendResponseWithJwt } from "@/functions/send-response";
import { AuthService } from "./auth.service";
import { JwtUserPayload } from "@/@types";
import { inject, injectable } from "tsyringe";
import { AuthRepository } from "./auth.repository";
import { authContainer } from "./auth.injection";

@injectable()
export class AuthController {
  constructor(private readonly service: AuthService) {}
  async login(req: Request, res: Response) {
    try {
      const { success, data, error } = userSchema.safeParse(req.body);
      if (!success) throw new Error(getZodError(error));

      const user = await this.service.login(data);

      const payload: JwtUserPayload = { id: user.id, email: user.email };
      return sendResponseWithJwt(
        res,
        payload,
        user,
        `Hello ${user.name}! Login successful`
      );
    } catch (err) {
      return res.status(500).json(err);
    }
  }
  register(req: Request, res: Response) {}
}
export const createAuthController = () => {
  const controller = authContainer.resolve(AuthController);

  return {
    login: controller.login.bind(controller),
    register: controller.register.bind(controller),
  };
};
