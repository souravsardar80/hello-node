import type { IncomingMessage, ServerResponse } from "node:http";
import { readProduct } from "../service/productService";
import type { IProduct } from "../types/product.type";

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

    const urlParts = url?.split('/');
    // console.log(urlParts);
    const id = urlParts && urlParts[1] === "products" ? Number(urlParts[2]) : null;

    // console.log(`the product id is: ${id}`);

    const products: IProduct = readProduct();

    if(url === "/products" && method === "GET"){
          res.writeHead(200,{"content-type" : "application/json"});
        res.end(JSON.stringify({message:"This is products route",
         data: products   
        }));
    } else if(method === "GET" && id !== null) {
        const product = products.find((p: IProduct) => p.id === id);
        // console.log(product);
        res.writeHead(200,{"content-type" : "application/json"});
        res.end(JSON.stringify({message:"Product retrived scuccessfully",
         data: product   
        }));
    }
  
}