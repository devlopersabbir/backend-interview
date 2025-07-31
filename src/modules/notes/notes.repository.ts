import { injectable } from "tsyringe";
import { NoteSchema } from "./notes.dto";
import { ObjectId } from "mongoose";
import { notesModel } from "./notes.model";

@injectable()
export class NotesRepository {
  async read() {
    return (await notesModel.find()) ?? [];
  }
  async create(input: NoteSchema) {
    return await notesModel.create(input);
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
  async findByTitle(title: NoteSchema["title"]) {
    return await notesModel.findOne({ title });
  }
}
