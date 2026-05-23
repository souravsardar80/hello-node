import type { IncomingMessage, ServerResponse } from "node:http";

export const userController = (req: IncomingMessage, res: ServerResponse) => {
    const url = req.url;
    const method = req.method;

    if(url === "/user" && method === "GET") {
        res.writeHead(200,{"content-type": "application/json"});
        res.end(JSON.stringify({"username":"Captain Sparrow",
             data: {"ship" : "black pearl"}
        }));
    }
}