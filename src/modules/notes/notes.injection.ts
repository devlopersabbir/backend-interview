import { container } from "tsyringe";
import { NotesController } from "./notes.controller";
import { NoteService } from "./notes.service";
import { NotesRepository } from "./notes.repository";

container.register(NotesController, { useClass: NotesController });
container.register(NoteService, { useClass: NoteService });
container.register(NotesRepository, { useClass: NotesRepository });

export { container as notesContainer };
