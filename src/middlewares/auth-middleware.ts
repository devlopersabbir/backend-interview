import { send_response } from "@/functions/send-response";
import { AuthService } from "@/modules/auth/auth.service";
import { NextFunction, Request, Response } from "express";

class AuthMiddleware {
  public async authCheck(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer "))
      return send_response(res, 403, "Forbidden access");

    try {
      const token = authHeader.split(" ")[1];
      if (!token) throw new Error("No token provided");

      const payload = await AuthService.verifyAccessToken(token);
      if (!payload.id || !payload.email)
        throw new Error("Invalid token payload");

      req.user = payload;
      next();
    } catch (error) {
      return send_response(res, 401, "Unauthorized", error.message);
    }
  }
}
export default new AuthMiddleware();
