import { createServer, IncomingMessage } from "node:http";
import { json } from "node:stream/consumers";

const server = createServer((req: IncomingMessage,res)=>{
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
    }else {
        //  res.writeHead(404,{"content-type" : "text/plain"});
        // res.end("route not found");

        res.writeHead(404,{"content-type" : "application/json"});
        res.end(JSON.stringify({message: "route not found"}));
        
    }
});

server.listen(5000, "0.0.0.0", ()=> {
    console.log("Server is running on the port 5000");
});