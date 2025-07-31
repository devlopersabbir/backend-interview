import { Request, Response } from "express";
import { getZodError } from "@/utils/error.utils";
import { send_response } from "@/functions/send-response";
import { injectable } from "tsyringe";
import { notesContainer } from "./notes.injection";
import { NoteService } from "./notes.service";
import { noteSchema } from "./notes.dto";

@injectable()
export class NotesController {
  constructor(private readonly service: NoteService) {}

  async store(req: Request, res: Response) {
    try {
      const { success, data, error } = noteSchema.safeParse(req.body);
      if (!success) throw new Error(getZodError(error));
      await this.service.store(data);

      return send_response(res, 201, "Notes created successfully");
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }
  async index(_: Request, res: Response) {
    try {
      const notes = await this.service.index();

      return res.status(200).json(notes);
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }
  async update(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) return send_response(res, 404, "Request note id is required!");

    try {
      const note = await this.service.update(id, req.body);

      return send_response(res, 200, "Note update successfully", note);
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }
  async findOne(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) return send_response(res, 404, "Request note id is required!");

    try {
      const note = await this.service.findOne(id);
      if (!note) return send_response(res, 404, "No notes found with that ID");

      return send_response(res, note);
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }
  async delete(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) return send_response(res, 404, "Request note id is required!");

    try {
      await this.service.delete(id);

      return send_response(res, 200, "Note deleted successfully");
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }
}
export const createNotesController = () => {
  const controller = notesContainer.resolve(NotesController);

  return {
    store: controller.store.bind(controller),
    index: controller.index.bind(controller),
    update: controller.update.bind(controller),
    findOne: controller.findOne.bind(controller),
    delete: controller.delete.bind(controller),
  };
};
