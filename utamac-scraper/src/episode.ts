import { ScrapeData, baseUrl } from "./scraper";
import UpdateHistories from "./updatehistory";
import cheerio from "cheerio";
import fs from "fs";
import utility from "./utility";

const url =
  "https://xn--pckua3ipc5705b.gamematome.jp/game/977/wiki/%e3%82%a8%e3%83%94%e3%82%bd%e3%83%bc%e3%83%89";

const fileName = "episodes.json";

export interface Episode {
  id: string;
  uri: string;
  name: string;
  icon: string;
  image: string;
  lastUpdated: string;
}

export default async function episodeScraperAsync() {
  return await UpdateHistories.usingHistory(url, async ($, lastUpdated) => {
    try {
      const filePath = UpdateHistories.getResourcePath(fileName);
      let old: ScrapeData<Episode[]>;
      if (fs.existsSync(filePath)) {
        const oldJson = fs.readFileSync(filePath, { encoding: "utf-8" });
        old = JSON.parse(oldJson) as ScrapeData<Episode[]>;
        if (old.lastUpdated === lastUpdated) {
          console.log(fileName + " : 取得済み");
          return;
        }
      }

      let episodes: Episode[];
      let maxId: number;
      if (old) {
        episodes = old.data;
        maxId = parseInt(
          episodes.reduce((a, b) => (parseInt(a.id) >= parseInt(b.id) ? a : b))
            .id
        );
      } else {
        episodes = [];
        maxId = 0;
      }

      // headerを飛ばす
      const rows = $(".page .table_styleG>table>tbody>tr").slice(1).toArray();
      for (let i = 0; i < rows.length; i++) {
        const name = $(rows[i]).find("td").first().next().find("a").text();
        if (episodes.findIndex((v) => v.name === name) >= 0) continue;
        const link = $(rows[i]).find("td").first().find("a");
        const uri = link.attr("href");
        const icon = link.find("img").attr("src");
        let episode = await scrapeItemAsync(uri);
        episode.name = name;
        episode.icon = icon;
        episodes.push(episode);
        console.log("new episode: [" + episodes.length + "/" + rows.length + "]");
        utility.sleep();
      }
      episodes = episodes.sort((a, b) =>
        new Date(a.lastUpdated) < new Date(b.lastUpdated) ? -1 : 1
      );
      for (let item of episodes) {
        // 既にidを持ってるのはスキップ
        if (item.id !== "") continue;
        item.id = ("000" + (maxId + 1)).slice(-4);
      }
      const result = {
        url,
        data: episodes,
        lastUpdated,
      } as ScrapeData<Episode[]>;
      const json = JSON.stringify(result);
      fs.writeFileSync(filePath, json, { encoding: "utf-8" });
      return episodes;
    } catch (error) {
      throw error;
    }
  });
}

async function scrapeItemAsync(uri: string) {
  try {
    const html = await utility.getHtml(url);
    const $ = cheerio.load(html);
    const image = $(".page img").first().attr("src");
    const lastUpdated = $(".page .last-updated time").text();
    // id、iconは後から入れる
    return {
      id: "",
      uri,
      name: "",
      icon: "",
      image,
      lastUpdated,
    } as Episode;
  } catch (error) {
    throw error;
  }
}
