import { container } from "tsyringe";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { AuthRepository } from "./auth.repository";

container.register(AuthRepository, { useClass: AuthRepository });
container.register(AuthService, { useClass: AuthService });
container.register(AuthController, { useClass: AuthController });

export { container as authContainer };
