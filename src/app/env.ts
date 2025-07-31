import { config } from "dotenv";
import { expand } from "dotenv-expand";
import { ZodError, z } from "zod";

const EnvSchema = z.object({
  PORT: z.string(),
  NODE_ENV: z.string().default("development"),
  LIVE_CLIENT: z.string().default("http://localhost:3000"),

  DATABASE_URL: z.string(),

  ACCESS_TOKEN_SECRET: z.string(),

  ACCESS_TOKEN_EXPIRES_IN: z.string(),
  REFRESH_TOKEN_EXPIRES_IN: z.string(),
  REFRESH_TOKEN_COOKIE_NAME: z.string().default("refresh_token"),
});

export type EnvSchema = z.infer<typeof EnvSchema>;

expand(config());

try {
  EnvSchema.parse(process.env);
} catch (error) {
  if (error instanceof ZodError) {
    let message = "Missing required values in .env:\n";
    error.issues.forEach((issue) => {
      message += (issue.path[0] as string) + "\n";
    });
    const e = new Error(message);
    e.stack = "";
    throw e;
  } else {
    console.error(error);
  }
}

export default EnvSchema.parse(process.env);
