import express from "express";
import cors from "cors";
import { corsOptions } from "@/configs";
import { authRouter } from "@/modules/auth/auth.routes";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { notesRouter } from "@/modules/notes/notes.routes";

const app = express();
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());

/** Routes */
app.use("/api", authRouter);
app.use("/api", notesRouter);

export { app };
