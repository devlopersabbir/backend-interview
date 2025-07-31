import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(3).max(255),
  email: z.email().endsWith("@gmail.com"),
  password: z.string().min(3).max(20),
});

export type UserSchema = z.infer<typeof userSchema>;
