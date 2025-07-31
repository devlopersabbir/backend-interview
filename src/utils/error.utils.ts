import { ZodError } from "zod";

export const getZodError = (error: ZodError) => {
  const errorMessage = error.issues[0]?.message || "Invalid data";
  const errorField =
    error.issues[0]?.path[0] || error.issues[0]?.path[1] || "unknown";

  return `${errorMessage}; error field ${errorField as string}`;
};
