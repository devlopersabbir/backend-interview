import { injectable } from "tsyringe";
import { userModel } from "./user.model";
import { UserSchema } from "./user.dto";

@injectable()
export class AuthRepository {
  async store(input: UserSchema) {
    return await userModel.create(input);
  }
  async findByEmail(email: string) {
    const user = userModel.findOne({
      email,
    });
    if (!user) throw new Error(`User not found on this mail (${email})`);
    return user;
  }
}
