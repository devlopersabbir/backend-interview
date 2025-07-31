import express from "express";
import cors from "cors";
import { corsOptions } from "@/configs";
import { authRouter } from "@/modules/auth/auth.routes";

// @ts-ignore
declare module "express-serve-static-core" {
  interface Request {
    user?: any;
    validatedData?: any;
  }
}

const app = express();
app.use(cors(corsOptions));
app.use(express.json());

/** Routes */
app.use("/api", authRouter);
// app.use("/api/notes", notesRouter);

export { app };
