import { emailField, passwordField } from "@/utils/zod.utility";
import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(3).max(255).optional(),
  email: emailField(),
  password: passwordField(),
});

export type UserSchema = z.infer<typeof userSchema>;
