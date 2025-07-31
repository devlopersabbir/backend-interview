import "reflect-metadata";
import "tsconfig-paths/register";
import { createServer } from "http";
import env from "@/app/env";
import { app } from "./app/server";
import { databseConnection } from "./configs";

(async () => {
  try {
    const server = createServer(app);

    await databseConnection();
    server.listen(parseInt(env.PORT), () =>
      console.log("running on port " + parseInt(env.PORT))
    );
  } catch (err) {
    console.error("Error starting the server:", err);
    process.exit(1);
  }
})();
