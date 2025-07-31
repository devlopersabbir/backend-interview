import { z } from "zod";

export const noteSchema = z.object({
  title: z.string().min(3).max(300),
  content: z.string().min(3).max(2000),
  user: z.any(),
});

export type NoteSchema = z.infer<typeof noteSchema>;
