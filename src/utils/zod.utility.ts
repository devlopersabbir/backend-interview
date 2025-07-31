import { z } from "zod";

export const emailField = () => {
  return z
    .email({
      error: "Email is required",
    })
    .trim()
    .min(1, "Email cannot be empty.")
    .endsWith("@gmail.com");
};

export const passwordField = () =>
  z
    .string()
    .min(3, "Password must be at least 8 characters long.")
    .max(255, "Password is too long.")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .regex(/[0-9]/, "Password must contain at least one digit.")
    .regex(
      /[@$!%*?&]/,
      "Password must contain at least one special character."
    );
