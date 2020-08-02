import { ScrapeData } from "./scraper";
import cheerio from "cheerio";
import fs from "fs";
import rp from "request-promise";

export interface Costume {
  id: number;
  name: string;
  diva: string;
  effect: string;
  toGet: string;
  url: string;
  image: string;
}
const baseUrl = "https://xn--pckua3ipc5705b.gamematome.jp";
const url =
  "https://xn--pckua3ipc5705b.gamematome.jp/game/977/wiki/%e6%ad%8c%e5%a7%ab_%e8%a1%a3%e8%a3%85";

const fileName = "costumes.json";
export async function costumeScraperAsync(outputPath?: string) {
  try {
    const filePath = outputPath + fileName;
    const html = await rp(url);
    const $ = cheerio.load(html);
    const lastUpdated = $(".last-updated time").first().html();
    if (fs.existsSync(filePath)) {
      const oldJson = fs.readFileSync(filePath, { encoding: "utf-8" });
      const old = JSON.parse(oldJson) as ScrapeData<Costume[]>;
      if (old.lastUpdated === lastUpdated) {
        console.log(this.fileName + " : 取得済み");
        return;
      }
    }

    // headerを飛ばす
    const links = $(".page table>tbody>tr>td>b>a")
      .toArray()
      .map((e) => $(e).attr("href"));
    const costumes = [];
    for (let link of links) {
      const item = await scrapeItemAsync(link);
      costumes.push(item);
    }
    const result = {
      url,
      data: costumes,
      lastUpdated,
    } as ScrapeData<Costume[]>;
    const json = JSON.stringify(result);

    fs.writeFileSync(filePath, json, { encoding: "utf-8" });
  } catch (error) {
    throw error;
  }
}

async function scrapeItemAsync(uri: string) {
  try {
    const html = await rp(baseUrl + uri);
    const $ = cheerio.load(html);
    const name = $(".page h1").text();
    const image = $(".page img").first().attr("src");
    const rows = $(".page table>tbody>tr");
    const diva = rows.find("td:contains(歌姫)").next().text();
    let howToGet = rows.find("td:contains(入手方法)").next().text();
    const hoToGetMatch = howToGet.match("「(.*)」");
    if (hoToGetMatch) {
      howToGet = hoToGetMatch[1];
    }
    let effect = rows.find("td:contains(効果)").next().text();
    const effectMatch = effect.match("(.*)※");
    if (effectMatch) {
      effect = effectMatch[1];
    }
    const lastUpdated = $(".page .last-updated time").text();
    return {
      uri,
      name,
      diva,
      image,
      howToGet,
      effect,
      lastUpdated,
    };
  } catch (error) {
    throw error;
  }
}
