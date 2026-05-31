import {
  createServer,
  IncomingMessage,
  Server,
  ServerResponse,
} from "node:http";
import config from "./config";
import { routeHandler } from "./routes/routes";

const server: Server = createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    routeHandler(req, res);
  },
);

server.listen(config.port, "0.0.0.0", () => {
  console.log("Server is listining in port 3000");
});
