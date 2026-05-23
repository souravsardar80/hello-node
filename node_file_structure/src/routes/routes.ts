import type { IncomingMessage, ServerResponse } from "node:http";

export const routeHandler = (req: IncomingMessage, res: ServerResponse) => {
     // console.log(req.url); // '/', '/user', '/products'
    // console.log(req.method); // "GET", "POST", "Delete"

    const url = req.url;
    const method = req.method;

    if(url === '/' && method === "GET") {
        // console.log("this is root route");
        // res.writeHead(200,{"content-type" : "text/plain"});

         res.writeHead(200,{"content-type" : "application/json"});
        res.end(JSON.stringify({message:"This is root route"}));
    }else if(url?.startsWith('/products')){
        res.writeHead(200,{"content-type" : "application/json"});
        res.end(JSON.stringify({message:"This is products route"}));
    }else if(url?.startsWith('/user')) {
        res.writeHead(200,{"content-type": "application/json"});
        res.end(JSON.stringify({"username":"Jack Sparrow"}));

    }else {
        //  res.writeHead(404,{"content-type" : "text/plain"});
        // res.end("route not found");

        res.writeHead(404,{"content-type" : "application/json"});
        res.end(JSON.stringify({message: "route not found"}));
        
    }
}