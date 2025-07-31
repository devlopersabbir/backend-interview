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
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    timestamps: true,
  }
);

export const notesModel = model("notes", schema);
