import type { ServerResponse } from "node:http";

export const sendResponse = (
  res: ServerResponse,
  statusCode: number,
  success: Boolean,
  message: string,
  data?: any,
) => {
  const response = {
    success: success,
    message: message,
    data: data,
  };
  res.writeHead(200, { "content-type": "application/json" });
  res.end(JSON.stringify(response));
};
