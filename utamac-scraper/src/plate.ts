import { ScrapeData, baseUrl } from "./scraper";
import utility from "./utility";
import UpdateHistories from "./updatehistory";
import cheerio from "cheerio";
import fs from "fs";
import rp from "request-promise";
import _ from "lodash";

// 一応全プレートの一覧だが、こっちは使えないので
const url =
  "https://xn--pckua3ipc5705b.gamematome.jp/game/977/wiki/%e3%83%97%e3%83%ac%e3%83%bc%e3%83%88";

// 属性別、シリーズ別に取ってから振り分けする
const attributeUrl = [
  [
    "star",
    "https://xn--pckua3ipc5705b.gamematome.jp/game/977/wiki/%e3%83%97%e3%83%ac%e3%83%bc%e3%83%88%e6%98%9f%e5%b1%9e%e6%80%a7%e4%b8%80%e8%a6%a7",
  ],
  [
    "love",
    "https://xn--pckua3ipc5705b.gamematome.jp/game/977/wiki/%e3%83%97%e3%83%ac%e3%83%bc%e3%83%88%e6%84%9b%e5%b1%9e%e6%80%a7%e4%b8%80%e8%a6%a7",
  ],
  [
    "life",
    "https://xn--pckua3ipc5705b.gamematome.jp/game/977/wiki/%e3%83%97%e3%83%ac%e3%83%bc%e3%83%88%e5%91%bd%e5%b1%9e%e6%80%a7%e4%b8%80%e8%a6%a7",
  ],
];

const seriesUrl = [
  [
    "超時空要塞マクロス",
    "https://xn--pckua3ipc5705b.gamematome.jp/game/977/wiki/%e3%83%97%e3%83%ac%e3%83%bc%e3%83%88_%e8%b6%85%e6%99%82%e7%a9%ba%e8%a6%81%e5%a1%9e%e3%83%9e%e3%82%af%e3%83%ad%e3%82%b9",
  ],
  [
    "マクロス7",
    "https://xn--pckua3ipc5705b.gamematome.jp/game/977/wiki/%e3%83%97%e3%83%ac%e3%83%bc%e3%83%88_%e3%83%9e%e3%82%af%e3%83%ad%e3%82%b97",
  ],
  [
    "マクロスF",
    "https://xn--pckua3ipc5705b.gamematome.jp/game/977/wiki/%e3%83%97%e3%83%ac%e3%83%bc%e3%83%88_%e3%83%9e%e3%82%af%e3%83%ad%e3%82%b9Frontier",
  ],
  [
    "マクロスΔ",
    "https://xn--pckua3ipc5705b.gamematome.jp/game/977/wiki/%e3%83%97%e3%83%ac%e3%83%bc%e3%83%88_%e3%83%9e%e3%82%af%e3%83%ad%e3%82%b9%ce%94",
  ],
  [
    "マクロスプラス",
    "https://xn--pckua3ipc5705b.gamematome.jp/game/977/wiki/%e3%83%97%e3%83%ac%e3%83%bc%e3%83%88_%e3%83%9e%e3%82%af%e3%83%ad%e3%82%b9%e3%83%97%e3%83%a9%e3%82%b9",
  ],
];

const fileName = "plates.json";

export interface Skill {
  name: string;
  rank: string;
  effect: string;
  conditions: string;
}

export interface PlateStatus {
  total: number;
  soul: number;
  voice: number;
  charm: number;
  life: number;
  suport: number;
  foldWave: number;
  luck: number;
}

export interface Plate {
  id: string;
  uri: string;
  name: string;
  rality: number[];
  attribute: string;
  series: string;
  image: string[];
  episode: string;
  centerSkill: Skill[][];
  activeSkill: Skill[][];
  liveSkill: Skill[][];
  compatibleDiva: string[];
  status: PlateStatus[];
  lastUpdated: string;
}

export default async function plateScraperAsync() {
  return await UpdateHistories.usingHistory(url, async ($, lastUpdated) => {
    try {
      const filePath = UpdateHistories.resourcesPath + fileName;
      let old: ScrapeData<Plate[]>;
      if (fs.existsSync(filePath)) {
        const oldJson = fs.readFileSync(filePath, { encoding: "utf-8" });
        old = JSON.parse(oldJson) as ScrapeData<Plate[]>;
        if (old.lastUpdated === lastUpdated) {
          console.log(fileName + " : 取得済み");
          return;
        }
      }
      let plates: Map<string, Plate>;
      if (old) {
        plates = new Map<string, Plate>(old.data.map((m) => [m.uri, m]));
      } else {
        plates = new Map<string, Plate>();
      }

      // 全プレート一覧の並び順を確認する為に取得しておく
      const allPlateUri = $(".page table>tbody>tr>td:last-child>a")
        .toArray()
        .map((m) => $(m).attr("href"));
      for (let uri of allPlateUri) {
        if (plates.has(uri)) continue;
        const plate = await scrapeItemAsync(uri);
        plates.set(plate.uri, plate);
        console.log("[" + plates.size + "/" + allPlateUri.length + "]");
      }

      // 属性順に取得する
      for (let i = 0; i < attributeUrl.length; i++) {
        const attributesList = await getPlateUriByCategoryAsync(
          attributeUrl[i][1]
        );
        const attribute = attributeUrl[i][0];
        for (let uri of attributesList) {
          if (!plates.has(uri)) continue;
          plates.set(uri, { ...plates.get(uri), attribute });
        }
      }

      // シリーズ一覧も取得して引き当てる
      for (let i = 0; i < seriesUrl.length; i++) {
        const seriesList = await getPlateUriByCategoryAsync(seriesUrl[i][1]);
        const series = seriesUrl[i][0];
        for (let uri of seriesList) {
          if (!plates.has(uri)) continue;
          plates.set(uri, { ...plates.get(uri), series });
        }
      }

      let data = Array.from(plates.values());
      // 条件1:超デカルガチャ★6>超銀河メダル交換★6>初期★5>初期★4...
      // 条件2:追加日（更新日）順
      // 条件3:一覧の並び順
      data = data.sort((a, b) => {
        console.log(a.rality + " vs " + b.rality);
        if (a.rality[0] > b.rality[0]) return -1;
        if (a.rality[0] < b.rality[0]) return 1;
        if (a.rality.length === 1) {
          if (b.rality.length === 2) return 1;
          return new Date(a.lastUpdated) < new Date(b.lastUpdated) ? -1 : 1;
        }
        if (b.rality.length === 1) return -1;
        if (a.rality[1] === b.rality[1]) {
          return new Date(a.lastUpdated) < new Date(b.lastUpdated) ? -1 : 1;
        } else {
          return a.rality[1] > b.rality[1] ? -1 : 1;
        }
      });

      let counter = new Map<number, number>([
        [6, 0],
        [5, 0],
        [4, 0],
        [3, 0],
        [2, 0],
        [1, 0],
      ]);
      const hasId = data.filter((f) => f.id !== "");
      for (let p of hasId) {
        counter.set(p.rality[0], counter.get(p.rality[0]) + 1);
      }
      for (let plate of data) {
        if (plate.id !== "") continue;
        const rality = plate.rality[0];
        counter.get(rality);
        plate.id =
          ("0" + rality).slice(-2) +
          ("000" + (counter.get(rality) + 1)).slice(-4);
        counter.set(rality, counter.get(rality) + 1);
      }

      const result = {
        url,
        data,
        lastUpdated,
      } as ScrapeData<Plate[]>;
      fs.writeFileSync(filePath, JSON.stringify(result), { encoding: "utf-8" });
    } catch (error) {
      throw error;
    }
  });
}

async function getPlateUriByCategoryAsync(url: string) {
  try {
    const html = await rp(url);
    const $ = cheerio.load(html);
    return $(".page table>tbody>tr>td:last-child>a")
      .toArray()
      .map((m) => $(m).attr("href"));
  } catch (error) {
    throw error;
  }
}

async function scrapeItemAsync(uri: string) {
  const itemUrl = utility.generateUrl(baseUrl, uri);
  return await UpdateHistories.usingHistory(itemUrl, async ($, lastUpdated) => {
    try {
      const page = $("div.page");
      const name = page.find("h1").text();
      const image = page
        .find("table")
        .first()
        .find("tr:first-child img")
        .toArray()
        .map((m) => $(m).attr("src"));
      let rality = page
        .find("table")
        .first()
        .find("tr:last-child td")
        .toArray()
        .map((m) => {
          const text = $(m).text();
          const match = text.match("★(.*)");
          if (match) {
            return parseInt(match[1]);
          } else {
            return parseInt(text);
          }
        });

      const episode = page
        .find("b:contains(エピソード)")
        .parent()
        .parent()
        .next()
        .find("table tr td:last-child>b>a")
        .text();
      const centerSkill = getSkill($, page, "センタースキル");
      const activeSkill = getSkill($, page, "アクティブスキル");
      const liveSkill = getSkill($, page, "ライブスキル");
      const compatibleDiva = page
        .find("b:contains(相性が良いオススメ歌姫)")
        .parent()
        .parent()
        .next()
        .find("table tr>td:last-child>div>b>a")
        .toArray()
        .map((m) => $(m).text());
      const status = getStatus($, page);
      return {
        id: "",
        uri,
        name,
        rality,
        attribute: "",
        series: "",
        image,
        episode,
        centerSkill,
        activeSkill,
        liveSkill,
        compatibleDiva,
        status,
        lastUpdated,
      } as Plate;
    } catch (error) {
      throw error;
    }
  });
}

function getSkill($: CheerioStatic, page: Cheerio, skillType: string) {
  try {
    const skillRows = page
      .find("b:contains(" + skillType + ")")
      .parent()
      .parent()
      .parent()
      .next()
      .find("table tr")
      .toArray();
    const name = $(skillRows[0]).find("td>b>a").text();
    // 二行目にスキル発動対象が書かれている場合がある
    const conditions = $(skillRows[1]).find("td[colspan]>b")?.text();
    const skip = conditions && conditions !== "" ? 2 : 1;
    const results = skillRows.slice(skip).map((m) => {
      const matched = $(m)
        .find("td:last-child")
        .text()
        .match(/[SABCD]+級：[^SABCD]*/g);
      if (matched === null) return [];
      return matched.map((m2) => {
        const array = m2.split("級：");
        return {
          name,
          rank: array[0],
          effect: array[1],
          conditions,
        } as Skill;
      });
    });
    // [スキル1[初期, LvMax, 変化後初期, 変化後LvMax], スキル2[...]] という形に持ちたいので
    return utility.transpose(results);
  } catch (error) {
    throw error;
  }
}

function getStatus($: CheerioStatic, page: Cheerio) {
  try {
    const rows = page
      .find("b:contains(ステータス)")
      .parent()
      .parent()
      .next()
      .find("table tr")
      .toArray()
      .map((m) =>
        $(m)
          .find("td")
          .toArray()
          .map((m2) => $(m2).text())
      );

    return [
      {
        total: parseInt(rows[1][1]),
        soul: parseInt(rows[1][2]),
        voice: parseInt(rows[1][3]),
        charm: parseInt(rows[1][4]),
        life: parseInt(rows[4][1]),
        suport: parseInt(rows[4][2]),
        foldWave: parseInt(rows[4][3]),
        luck: parseInt(rows[4][4]),
      },
      {
        total: parseInt(rows[2][1]),
        soul: parseInt(rows[2][2]),
        voice: parseInt(rows[2][3]),
        charm: parseInt(rows[2][4]),
        life: parseInt(rows[5][1]),
        suport: parseInt(rows[5][2]),
        foldWave: parseInt(rows[5][3]),
        luck: parseInt(rows[5][4]),
      },
    ] as PlateStatus[];
  } catch (error) {
    throw error;
  }
}
