import { ScrapeData, baseUrl } from "./scraper";
import UpdateHistories from "./updatehistory";
import cheerio from "cheerio";
import fs from "fs";
import rp from "request-promise";

const url =
  "https://xn--pckua3ipc5705b.gamematome.jp/game/977/wiki/%e6%ad%8c%e5%a7%ab_%e6%ad%8c%e5%a7%ab";

const fileName = "divas.json";

export interface Diva {
  id: string;
  uri: string;
  icon: string;
  name: string;
  series: string;
  image: string;
  initialTotal: number;
  initialSoul: number;
  initialVoice: number;
  initialCharm: number;
  maxTotal: number;
  maxSoul: number;
  maxVoice: number;
  maxCharm: number;
  initialLife: number;
  initialSuport: number;
  initialFoldWave: number;
  maxLife: number;
  maxSuport: number;
  maxFoldWave: number;
  lastUpdated: string;
}

export async function divaScraperAsync(outputPath?: string) {
  try {
    const filePath = outputPath + fileName;
    const html = await rp(url);
    const $ = cheerio.load(html);
    const lastUpdated = $(".last-updated time").first().text();
    if (lastUpdated === UpdateHistories.histories.get(url)) return;
    let old: ScrapeData<Diva[]>;
    if (fs.existsSync(filePath)) {
      const oldJson = fs.readFileSync(filePath, { encoding: "utf-8" });
      old = JSON.parse(oldJson) as ScrapeData<Diva[]>;
      if (old.lastUpdated === lastUpdated) {
        console.log(fileName + " : 取得済み");
        return;
      }
    }

    // headerを飛ばす
    const icons = $(".page table>tbody>tr>td>a>img")
      .toArray()
      .map((e) => $(e).attr("src"));
    const links = $(".page table>tbody>tr>td>b>a")
      .toArray()
      .map((e) => $(e).attr("href"));
    let divas: Diva[];
    if (old) {
      divas = old.data;
    } else {
      divas = [];
    }
    for (let i = 0; i < links.length; i++) {
      if (divas.findIndex((v) => v.uri === links[i]) > 0) continue;
      const item = await scrapeItemAsync(links[i]);
      if (item === null) continue;
      item.icon = icons[i];
      item.id = ("0" + (i + 1)).slice(-2);
      divas.push(item);
    }
    const result = {
      url,
      data: divas,
      lastUpdated,
    } as ScrapeData<Diva[]>;
    const json = JSON.stringify(result);

    fs.writeFileSync(filePath, json, { encoding: "utf-8" });
    UpdateHistories.histories.set(url, lastUpdated);
  } catch (error) {
    throw error;
  }
}
const divaSeriesMap = new Map([
  [
    "https://cdn-image.pf.dena.com/fa9c327e33426cd5e3dff097aa3feee754c90f9a/1/c0b54b96-e7b6-3bc7-b1b8-f1e3af013134.png",
    "超時空要塞マクロス",
  ],
  [
    "https://cdn-image.pf.dena.com/fa9c327e33426cd5e3dff097aa3feee754c90f9a/1/4a4e2850-0413-3452-9984-ccc1225ae255.png",
    "マクロス7",
  ],
  [
    "https://cdn-image.pf.dena.com/fa9c327e33426cd5e3dff097aa3feee754c90f9a/1/57399f40-4cbd-3ba5-a3b8-c0874578eaef.png",
    "マクロスF",
  ],
  [
    "https://cdn-image.pf.dena.com/fa9c327e33426cd5e3dff097aa3feee754c90f9a/1/9dfe8662-f766-3463-8f90-ad7dbdc30f30.png",
    "マクロスΔ",
  ],
]);

async function scrapeItemAsync(uri: string) {
  try {
    const html = await rp(baseUrl + uri);
    const $ = cheerio.load(html);
    const name = $(".page h1").text();
    const image = $(".page img").first().attr("src");
    const series = divaSeriesMap.get($(".page img").last().attr("src"));
    const initialRows = $(".page table>tbody>tr>td:contains(初期)");
    const initialMain = initialRows.first();
    const initialTotal = parseInt(initialMain.next().text());
    const initialSoul = parseInt(initialMain.next().next().text());
    const initialVoice = parseInt(initialMain.next().next().next().text());
    const initialCharm = parseInt(
      initialMain.next().next().next().next().text()
    );

    const initialSub = initialRows.last();
    const initialLife = parseInt(initialSub.next().text());
    const initialSuport = parseInt(initialSub.next().next().text());
    const initialFoldWave = parseInt(initialSub.next().next().next().text());

    const maxRows = $(".page table>tbody>tr>td:contains(最大)");
    const maxMain = maxRows.eq(1);
    const maxTotal = parseInt(maxMain.next().text());
    const maxSoul = parseInt(maxMain.next().next().text());
    const maxVoice = parseInt(maxMain.next().next().next().text());
    const maxCharm = parseInt(maxMain.next().next().next().next().text());

    const maxSub = maxRows.eq(2);
    const maxLife = parseInt(maxSub.next().text());
    const maxSuport = parseInt(maxSub.next().next().text());
    const maxFoldWave = parseInt(maxSub.next().next().next().text());
    const lastUpdated = $(".page .last-updated time").text();

    // id、iconは後から入れる
    return {
      id: "",
      uri,
      icon: "",
      name,
      series,
      image,
      initialTotal,
      initialSoul,
      initialVoice,
      initialCharm,
      maxTotal,
      maxSoul,
      maxVoice,
      maxCharm,
      initialLife,
      initialSuport,
      initialFoldWave,
      maxLife,
      maxSuport,
      maxFoldWave,
      lastUpdated,
    } as Diva;
  } catch (error) {
    throw error;
  }
}
