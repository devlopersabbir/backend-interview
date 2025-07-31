import { hash, verify } from "argon2";

// Function to hash a password
export async function hashPassword<T extends string>(password: T): Promise<T> {
  return (await hash(password)) as T;
}

export async function comparePassword(
  hashed: string,
  password: string
): Promise<boolean> {
  return await verify(hashed, password);
}
