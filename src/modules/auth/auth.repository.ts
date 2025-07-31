import { injectable } from "tsyringe";
import { userModel } from "./user.model";

@injectable()
export class AuthRepository {
  async findByEmail(email: string) {
    const user = userModel.findOne({
      email,
    });
    if (!user) throw new Error(`User not found on this mail (${email})`);
    return user;
  }
}
