import { injectable } from "tsyringe";
import { NoteSchema } from "./notes.dto";
import { NotesRepository } from "./notes.repository";
import { JwtUserPayload } from "@/@types";
import { AuthRepository } from "../auth/auth.repository";

@injectable()
export class NoteService {
  constructor(
    private readonly repository: NotesRepository,
    private readonly userRepo: AuthRepository
  ) {}

  async store(input: NoteSchema, user: JwtUserPayload) {
    const note = await this.repository.findByTitle(input.title);
    if (note) throw new Error(`(${input.title}) title is already exist`);

    const requestUser = await this.userRepo.findByEmail(user.email);
    if (!requestUser) throw new Error("Request user not found!");

    // create a new note
    return await this.repository.create(input, requestUser.id);
  }
  async index() {
    return await this.repository.read();
  }
  async update(id: string, input: Partial<NoteSchema>) {
    const note = await this.repository.readById(id);
    if (!note) throw new Error(`Note not found with that ID`);

    // make sure it's a owner of this notes
    const isOwner = await this.repository.readByUserId(input.user);
    if (!isOwner) throw new Error("You are unable to update this note");

    // if requested title is already exist
    const isTitleExist = await this.repository.findByTitle(input.title);
    if (isTitleExist) throw new Error(`(${input.title}) is already exist`);

    // update note
    return this.repository.update(id, input);
  }
  async findOne(id: string) {
    return await this.repository.readById(id);
  }
  async findOwnOne(noteId: string, userId: string) {
    return await this.repository.readOwnById({ noteId, userId });
  }
  async delete(id: string, userId: string) {
    const note = await this.repository.readById(id);
    if (!note) throw new Error("Note not found with that ID");

    // make sure it's a owner of this notes
    const isOwner = await this.repository.readByUserId(userId);
    if (!isOwner) throw new Error("You are unable to delete this note");

    return await this.repository.delete(id);
  }
}
