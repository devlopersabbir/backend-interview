import { model, Schema } from "mongoose";
import type { NoteSchema } from "./notes.dto";

const schema = new Schema<NoteSchema>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const notesModel = model("notes", schema);
