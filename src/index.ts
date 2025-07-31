import { createServer } from "http";
import { env } from "./app";
import { app } from "./app/app";

(async () => {
  try {
    const server = createServer(app);

    server.listen(parseInt(env.PORT), () =>
      console.log("running on port " + parseInt(env.PORT))
    );
  } catch (err) {
    console.error("Error starting the server:", err);
    process.exit(1);
  }
})();
