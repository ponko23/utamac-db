import fs from "fs";
import rp from "request-promise";
import cheerio from "cheerio";
import utility from "./utility";

class UpdateHistories {
  public histories: Map<string, string>;
  public useCache: boolean;
  constructor() {
    this.histories = new Map<string, string>();
    this.useCache = false;
  }

  public load = (resourcesPath: string) => {
    const filePath = resourcesPath + "index.json";
    if (fs.existsSync(filePath)) {
      const json = fs.readFileSync(filePath, { encoding: "utf-8" });
      const data = JSON.parse(json) as [string, string][];
      this.histories = new Map(data);
    }
  };

  public save = (resourcesPath: string) => {
    const filePath = resourcesPath + "index.json";
    const json = JSON.stringify(Array.from(this.histories));
    fs.writeFileSync(filePath, json, { encoding: "utf-8" });
  };

  public async usingHistory<T>(
    url: string,
    func: ($: CheerioStatic, lastUpdated: string) => Promise<T>
  ) {
    try {
      let html: string = "";
      let hasCache: boolean = false;
      if (this.useCache) {
        const cacheFileName = `./caches/${utility.getLastUri(url)}.html`;
        if (fs.existsSync(cacheFileName)) {
          html = fs.readFileSync(cacheFileName, { encoding: "utf-8" });
          hasCache = true;
        }
      }
      if (html === "") {
        html = await rp(url);
      }
      const $ = cheerio.load(html);
      const lastUpdated = $(".page .last-updated time").text();
      // 保存はできるけど、保存しているものから読み込んで処理をする、という流れをどうしよう？
      // キャッシュ取って解析終われば履歴に同じ日時で記録されるから、意味がない？
      if (lastUpdated === this.histories.get(url)) return;
      if (this.useCache && !hasCache) {
        fs.writeFileSync(`./caches/${utility.getLastUri(url)}.html`, html, {
          encoding: "utf-8",
        });
        hasCache = true;
      }
      const result = await func($, lastUpdated);
      this.histories.set(url, lastUpdated);
      return result;
    } catch (error) {
      this.histories.set(url, error.message);
    }
  }
}

export default new UpdateHistories();
