// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
  Body,
  Catch,
  createHandler,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Res,
  ValidationPipe,
} from "@storyofams/next-api-decorators";
import axios from "axios";
import { url } from "inspector";
import { NextResponse } from "next/server";
import { methodNotAllowedExceptionHandler } from "../../../exceptions/bad.exception";

@Catch(methodNotAllowedExceptionHandler)
class ImageController {
  @Get("/")
  async getMeta(@Query("u") id: any, @Res() ress) {
    try {
      const result = await getBase64(fixedEncodeURI(id));

      ress.writeHead(200, {
        "Content-Type": "image/png",
        "Content-Length": result.length,
      });
      ress.end(result);
    } catch (e) {}
  }
}

export default createHandler(ImageController);
async function getBase64(url) {
  return await axios
    .get(url, {
      responseType: "arraybuffer",
    })
    .then((response) => Buffer.from(response.data, "base64"));
}
function fixedEncodeURI(str) {
  return encodeURI(str).replace(/%5B/g, "[").replace(/%5D/g, "]");
}
