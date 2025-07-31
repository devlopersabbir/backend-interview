import { injectable } from "tsyringe";
import { NoteSchema } from "./notes.dto";
import { notesModel } from "./notes.model";
import { UserSchema } from "../auth/user.dto";

@injectable()
export class NotesRepository {
  async read() {
    return (await notesModel.find()) ?? [];
  }
  async create(input: NoteSchema, id: string) {
    return await notesModel.create({ ...input, user: id });
  }
  async update(id: string, input: Partial<NoteSchema>) {
    return await notesModel.findByIdAndUpdate(id, input, {
      new: true,
    });
  }
  async delete(id: string) {
    return await notesModel.findByIdAndDelete(id);
  }
  async readById(id: string) {
    return await notesModel.findById(id);
  }
  async readByUserId(userId: string) {
    return await notesModel.findOne({
      user: userId,
    });
  }
  async findByTitle(title: NoteSchema["title"]) {
    return await notesModel.findOne({ title });
  }
}
