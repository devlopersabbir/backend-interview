import { container } from "tsyringe";
import { NotesController } from "./notes.controller";

container.register(NotesController, { useClass: NotesController });

export { container as notesContainer };
