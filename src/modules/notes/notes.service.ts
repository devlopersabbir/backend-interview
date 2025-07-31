import { injectable } from "tsyringe";
import { NoteSchema } from "./notes.dto";
import { NotesRepository } from "./notes.repository";

@injectable()
export class NoteService {
  constructor(private readonly repository: NotesRepository) {}

  async store(input: NoteSchema) {
    const note = await this.repository.findByTitle(input.title);
    if (note) throw new Error(`(${input.title}) title is already exist`);

    // create a new note
    return await this.repository.create(input);
  }
  async index() {
    return await this.repository.read();
  }
  async update(id: string, input: Partial<NoteSchema>) {
    const note = await this.repository.readById(id);
    if (!note) throw new Error(`Note not found with that ID`);

    // update note
    return this.repository.update(id, input);
  }
  async findOne(id: string) {
    return await this.repository.readById(id);
  }
  async delete(id: string) {
    const note = await this.repository.readById(id);
    if (!note) throw new Error("Note not found with that ID");
    return await this.repository.delete(id);
  }
}
