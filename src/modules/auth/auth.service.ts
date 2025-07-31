import { comparePassword } from "@/libs";
import { UserSchema } from "./user.dto";
import { AuthRepository } from "./auth.repository";
import { JwtUserPayload } from "@/@types";
import env from "@/app/env";
import jwt, { type SignOptions } from "jsonwebtoken";
import { injectable } from "tsyringe";

@injectable()
export class AuthService {
  constructor(private readonly repository: AuthRepository) {}

  async login(input: UserSchema) {
    const user = await this.repository.findByEmail(input.email);

    if (!(await comparePassword(user.password, input.password))) {
      throw new Error("Invalid credentials");
    }
    return user;
  }
  // Generate access token
  public static generateAccessToken<P extends JwtUserPayload>(
    payload: P,
    expiresIn = env.ACCESS_TOKEN_EXPIRES_IN
  ) {
    return jwt.sign(payload, env.ACCESS_TOKEN_SECRET, {
      expiresIn: expiresIn as SignOptions["expiresIn"],
    });
  }

  // Verify access token
  public static verifyAccessToken<T extends JwtUserPayload>(
    token: string
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, env.ACCESS_TOKEN_SECRET, (err: any, decoded: any) => {
        if (err) return reject(err as any);
        resolve(decoded as T);
      });
    });
  }
}
