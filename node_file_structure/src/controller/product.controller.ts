import type { IncomingMessage, ServerResponse } from "node:http";
import { readProduct } from "../service/productService";

export const productController = (req: IncomingMessage, res: ServerResponse)=>{
    const url = req.url;
    const method = req.method;
    // const products = [
    //     {
    //         id: 1,
    //         name:   "Product1"
    //     }
    // ]

    // readProduct();

    const products = readProduct();

    if(url === "/products" && method === "GET"){
          res.writeHead(200,{"content-type" : "application/json"});
        res.end(JSON.stringify({message:"This is products route",
         data: products   
        }));
    }
  
}