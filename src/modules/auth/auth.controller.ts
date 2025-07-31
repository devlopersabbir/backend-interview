import { injectable } from "tsyringe";
import type { Request, Response } from "express";
import { userSchema } from "./user.dto";
import { getZodError } from "@/utils/error.utils";
import { send_response, sendResponseWithJwt } from "@/functions/send-response";
import { AuthService } from "./auth.service";
import { JwtUserPayload } from "@/@types";
import { authContainer } from "./auth.injection";

@injectable()
export class AuthController {
  constructor(private readonly service: AuthService) {}

  async register(req: Request, res: Response) {
    try {
      const { success, data, error } = userSchema.safeParse(req.body);
      if (!success) throw new Error(getZodError(error));
      await this.service.register(data);

      return send_response(res, 201, "Account created successfully");
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
  async login(req: Request, res: Response) {
    try {
      const { success, data, error } = userSchema.safeParse(req.body);
      if (!success) throw new Error(getZodError(error));

      const user = await this.service.login(data);

      const payload: JwtUserPayload = { id: user.id, email: user.email };
      return sendResponseWithJwt(
        res,
        payload,
        `Hello ${user.name}! Login successful`
      );
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
}
export const createAuthController = () => {
  const controller = authContainer.resolve(AuthController);

  return {
    login: controller.login.bind(controller),
    register: controller.register.bind(controller),
  };
};
