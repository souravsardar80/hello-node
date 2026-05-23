import { Server, createServer, IncomingMessage, ServerResponse } from "node:http";
import { routeHandler } from "./routes/routes";



const server: Server = createServer(
    (req: IncomingMessage, res: ServerResponse) => {
        routeHandler(req, res);
    }
);

server.listen(5000,"0.0.0.0", ()=>{
    console.log("Server is listining in port 5000");
})