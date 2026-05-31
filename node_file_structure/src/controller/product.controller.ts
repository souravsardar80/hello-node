import type { IncomingMessage, ServerResponse } from "node:http";
import { insertProduct, readProduct } from "../service/productService";
import type { IProduct } from "../types/product.type";
import { parseBody } from "../utility/parseBody";

export const productController = async (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  // console.log("Request", req);
  const url = req.url;
  const method = req.method;

  // const products = [
  //     {
  //         id: 1,
  //         name:   "Product1"
  //     }
  // ]

  // readProduct();

  const urlParts = url?.split("/");
  // console.log(urlParts);
  const id =
    urlParts && urlParts[1] === "products" ? Number(urlParts[2]) : null;

  // console.log(`the product id is: ${id}`);

  const products: IProduct = readProduct();

  if (url === "/products" && method === "GET") {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({ message: "This is products route", data: products }),
    );
  } else if (method === "GET" && id !== null) {
    const product = products.find((p: IProduct) => p.id === id);
    // console.log(product);
    if (!product) {
      res.writeHead(404, { "content-type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Product not found",
          data: null,
        }),
      );
    } else {
      res.writeHead(200, {
        "content-type": "application/json",
      });
      res.end(
        JSON.stringify({
          message: "Product retrived successfully!",
          data: product,
        }),
      );
    }
  } else if (method === "POST" && url === "/products") {
    const body = await parseBody(req);
    const newProduct = {
      id: Date.now(),
      ...body,
    };
    // console.log(newProduct);
    // console.log("Body", body);
    products.push(newProduct);
    insertProduct(products);
    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Product created scuccessfully",
        data: newProduct,
      }),
    );
  } else if (method === "PUT" && id !== null) {
    const body = await parseBody(req);
    const index = products.findIndex((p: IProduct) => p.id === id);
    console.log(index);

    if (index < 0) {
      res.writeHead(404, { "content-type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Product not found",
          data: null,
        }),
      );
    }
    // console.log(products[index]);
    products[index] = { id: products[index].id, ...body };
    insertProduct(products);
    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "product updated successfully",
        data: products[index],
      }),
    );
  } else if (method === "DELETE" && id !== null) {
    const index = products.findIndex((p: IProduct) => p.id === id);
    if (index < 0) {
      res.writeHead(404, { "content-type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Product not found",
          data: null,
        }),
      );
    }
    // const arr = ["1", "2", "3", "4"];
    // arr.splice(2, 1);
    // console.log(arr);

    products.splice(index, 1);
    console.log(products);
    insertProduct(products);
    res.end(
      JSON.stringify({
        message: "Product deleted successfully",
        data: null,
      }),
    );
  }
};
