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
  ValidationPipe,
} from "@storyofams/next-api-decorators";
import { extract } from "article-parser";
import axios from "axios";
import {
  CrawlerBodyDto,
  CrawlerParamDto,
  CrawlerQueryDto,
  CrawlerUpdateBodyDto,
} from "../../../DTO/crawler.dto";
import { methodNotAllowedExceptionHandler } from "../../../exceptions/bad.exception";
import { prisma } from "../../../prisma/prisma";
import { News } from "../../../types/news.type";
const metascraper = require("metascraper")([
  require("metascraper-author")(),
  require("metascraper-date")(),
  require("metascraper-description")(),
  require("metascraper-image")(),
  require("metascraper-logo")(),
  require("metascraper-clearbit")(),
  require("metascraper-publisher")(),
  require("metascraper-title")(),
  require("metascraper-video")(),
  require("metascraper-address")(),
  require("metascraper-lang")(),
  require("metascraper-readability")(),
]);

@Catch(methodNotAllowedExceptionHandler)
class CrawlerController {
  @Get("/meta")
  getMeta() {
    return prisma.news.findMany({ orderBy: { date: "desc" } });
  }

  @Patch("/meta")
  async checkMeta(@Query(ValidationPipe({})) urlInput: CrawlerQueryDto) {
    const { url, html } = await axios
      .get(fixedEncodeURI(urlInput.u))
      .then(async (res) => ({
        url: urlInput.u,
        html: res.data,
      }));
    const result: News = await metascraper({ url, html });
    return { ...result, url: fixedEncodeURI(urlInput.u) };
  }
  @Patch("/extract")
  async articleMeta(@Query(ValidationPipe({})) urlInput: CrawlerQueryDto) {
    return extract(fixedEncodeURI(urlInput.u));
  }
  @Patch("/meta/search")
  searchMeta(@Query(ValidationPipe({})) urlInput: CrawlerQueryDto) {
    return prisma.news.findMany({
      where: {
        OR: [
          { title: { startsWith: urlInput.u } },
          { publisher: { startsWith: urlInput.u } },
          { publisher: { startsWith: urlInput.u } },
          { description: { startsWith: urlInput.u } },
        ],
      },
    });
  }
  @Post("/meta")
  async createMeta(@Body() body: CrawlerBodyDto) {
    return prisma.news.create({ data: body });
  }
  @Put("/meta/:id")
  updateMeta(
    @Param("", ValidationPipe({})) param: CrawlerParamDto,
    @Body() body: CrawlerUpdateBodyDto,
  ) {
    return prisma.news.update({
      where: { id: param.id },
      data: body,
    });
  }
  @Delete("/meta/:id")
  deleteMeta(@Param("", ValidationPipe({})) param: CrawlerParamDto) {
    return prisma.news.delete({ where: { id: param.id } });
  }
}

export default createHandler(CrawlerController);
function fixedEncodeURI(str) {
  return encodeURI(str).replace(/%5B/g, "[").replace(/%5D/g, "]");
}
