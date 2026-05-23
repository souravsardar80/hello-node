import type { IncomingMessage, ServerResponse } from "node:http";
import { productController } from "../controller/product.controller";
import { userController } from "../controller/user.controller";

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
        productController(req,res);
    }else if(url?.startsWith('/user')) {
        userController(req,res);

    }else {
        //  res.writeHead(404,{"content-type" : "text/plain"});
        // res.end("route not found");

        res.writeHead(404,{"content-type" : "application/json"});
        res.end(JSON.stringify({message: "route not found"
        }));
        
        
    }
}