import { ScrapeData, baseUrl } from "./scraper";
import utility from "./utility";
import UpdateHistories from "./updatehistory";
import cheerio from "cheerio";
import fs from "fs";

const url =
  "https://xn--pckua3ipc5705b.gamematome.jp/game/977/wiki/%e6%ad%8c%e5%a7%ab_%e8%a1%a3%e8%a3%85";

const fileName = "costumes.json";

export interface Costume {
  id: string;
  uri: string;
  name: string;
  diva: string;
  effect: string;
  howToGet: string;
  image: string;
  lastUpdated: string;
}

export default async function costumeScraperAsync() {
  return await UpdateHistories.usingHistory(url, async ($, lastUpdated) => {
    try {
      const filePath = UpdateHistories.getResourcePath(fileName);
      let old: ScrapeData<Costume[]>;
      if (fs.existsSync(filePath)) {
        const oldJson = fs.readFileSync(filePath, { encoding: "utf-8" });
        old = JSON.parse(oldJson) as ScrapeData<Costume[]>;
        if (old.lastUpdated === lastUpdated) {
          console.log(fileName + " : 取得済み");
          return;
        }
      }

      // headerを飛ばす
      const links = $(".page table>tbody>tr>td>b>a")
        .toArray()
        .map((e) => $(e).attr("href"));
      let costumes: Costume[];
      if (old) {
        costumes = old.data;
      } else {
        costumes = [];
      }
      for (let link of links) {
        if (costumes.findIndex((v) => v.uri === link) >= 0) continue;
        const item = await scrapeItemAsync(link);
        costumes.push(item);
        utility.sleep();
      }
      // 固定のリスト（歌姫リスト）を先に作ってからidはそっちで決定したい
      const divas = Array.from(new Set(costumes.map((m) => m.diva)));
      const divaIdMap = new Map(divas.map((m, i) => [m, i + 1]));
      // 初期衣装をid1に固定したいので2からはじめる
      const divaMap = new Map(
        divas.map((m) => {
          let count = 0;
          if (old) {
            count = old.data.filter((f) => f.diva === m).length;
          }
          return [m, count === 0 ? 2 : count + 1];
        })
      );

      // 基本的には更新日時順だが、初期には同じ日付の物もあるので元の表の並び順も保持したい
      costumes = costumes.sort((a, b) =>
        new Date(a.lastUpdated) < new Date(b.lastUpdated) ? -1 : 1
      );

      for (let item of costumes) {
        // 既にidを持ってるのはスキップ
        if (item.id !== "") continue;

        let id: number;
        // 初期衣装の更新日がなんかおかしいので無理矢理1にする
        if (item.howToGet === "最初から所持") {
          // もし、新規歌姫が追加されて最初から所持している衣装が2着以上あったらid1が被るけど、多分ない
          id = 1;
        } else {
          id = divaMap.get(item.diva);
          divaMap.set(item.diva, id + 1);
        }
        item.id =
          ("0" + divaIdMap.get(item.diva)).slice(-2) + ("000" + id).slice(-4);
      }
      costumes = costumes.sort((a, b) => parseInt(a.id) - parseInt(b.id));
      const result = {
        url,
        data: costumes,
        lastUpdated,
      } as ScrapeData<Costume[]>;
      const json = JSON.stringify(result);
      fs.writeFileSync(filePath, json, { encoding: "utf-8" });
      return costumes;
    } catch (error) {
      throw error;
    }
  });
}

async function scrapeItemAsync(uri: string) {
  const itemUrl = utility.generateUrl(baseUrl, uri);
  try {
    const html = await utility.getHtml(url);
    const $ = cheerio.load(html);
    const lastUpdated = $(".page .last-updated time").text();
    if (lastUpdated === UpdateHistories.histories.get(url)) return;
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
    // idは後から入れる
    const result = {
      id: "",
      uri,
      name,
      diva,
      effect,
      howToGet,
      image,
      lastUpdated,
    } as Costume;
    UpdateHistories.histories.set(itemUrl, lastUpdated);
    return result;
  } catch (error) {
    UpdateHistories.histories.set(itemUrl, error.message);
  }
}
