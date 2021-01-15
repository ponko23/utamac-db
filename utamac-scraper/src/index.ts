import costumeScraperAsync, { Costume } from "./costume";
import divaScraperAsync from "./diva";
import episodeScraperAsync from "./episode";
import plateScraperAsync, { Plate } from "./plate";
import UpdateHistories from "./updatehistory";
import fs from "fs";
import { ScrapeData } from "./scraper";
async function mainAsync() {
  try {
    const outputPath = "../utamac-web/src/data/";

    UpdateHistories.setupResourcesPath(outputPath);
    UpdateHistories.useCache = false; // 上手くいかない
    UpdateHistories.load();
    // 未実装機能で使う事を考慮して、取得し終わったデータを全部返している
    const divas = await divaScraperAsync();
    const episodes = await episodeScraperAsync();
    const costumes = await costumeScraperAsync();
    const plates = await plateScraperAsync();

    // jsonファイルをspreadsheet用のtsvファイルに変換する
    // await convertToPlatesTsv(outputPath);
    // await contervToCostumesTsv(outputPath);
    // 未実装な部分
    // 取得したjsonを加工してスリムにする
    // 他データのID表記にする、URLを削除する等

    // WIKIにない追加のデータをマージする
    // プレートのノーツ期待値とか衣装強化とか
  } catch (error) {
    console.log(Object.keys(error), error.message);
    throw error;
  } finally {
    UpdateHistories.save();
  }
}
async function contervToCostumesTsv(outputPath: string) {
  const json = fs.readFileSync(outputPath + "costumes.json", {
    encoding: "utf-8",
  });
  const data = JSON.parse(json) as ScrapeData<Costume[]>;
  const result: any[][] = [];
  result.push([
    "id",
    "uri",
    "name",
    "diva",
    "effect",
    "howToGet",
    "image",
    "lastUpdated",
  ]);
  for (let item of data.data) {
    const row = [
      item.id,
      item.uri,
      item.name,
      item.diva,
      item.effect,
      item.howToGet,
      item.image,
      item.lastUpdated,
    ];
    result.push(row);
  }
  const rows = result.map((p) => p.join("\t"));
  const tsv = rows.join("\r");
  fs.writeFileSync(outputPath + "costumes.tsv", tsv, { encoding: "utf-8" });
}

async function convertToPlatesTsv(outputPath: string) {
  const json = fs.readFileSync(outputPath + "plates.json", {
    encoding: "utf-8",
  });
  const data = JSON.parse(json) as ScrapeData<Plate[]>;
  const result: any[][] = [];
  result.push([
    "id",
    "title",
    "initial_rality",
    "release_rality",
    "attribute",
    "series",
    "initial_image",
    "release_image",
    "episode",
    "initial_total",
    "initial_soul",
    "initial_voice",
    "initial_charm",
    "initial_life",
    "release_total",
    "release_soul",
    "release_voice",
    "release_charm",
    "release_life",
    "suport",
    "foldWave",
    "luck",
    "recovery_notes",
    "score_notes",
    "item_notes",
    "foldwave_notes",
    "attack_notes",
    "initial_center_skill_name",
    "initial_center_skill_rank",
    "initial_center_skill_effect",
    "initial_center_skill_conditions",
    "release_center_skill_name",
    "release_center_skill_rank",
    "release_center_skill_effect",
    "release_center_skill_conditions",
    "initial_special_center_skill_name",
    "initial_special_center_skill_rank",
    "initial_special_center_skill_effect",
    "initial_special_center_skill_conditions",
    "release_special_center_skill_name",
    "release_special_center_skill_rank",
    "release_special_center_skill_effect",
    "release_special_center_skill_conditions",
    "initial_active_skill_name",
    "initial_active_skill_rank",
    "initial_active_skill_effect",
    "initial_active_skill_conditions",
    "release_active_skill_name",
    "release_active_skill_rank",
    "release_active_skill_effect",
    "release_active_skill_conditions",
    "initial_live_skill_name",
    "initial_live_skill_rank",
    "initial_live_skill_effect",
    "initial_live_skill_conditions",
    "release_live_skill_name",
    "release_live_skill_rank",
    "release_live_skill_effect",
    "release_live_skill_conditions",
    "effective_divas",
    "last_updated",
  ]);

  for (let item of data.data) {
    const row = [
      item.id,
      item.name,
      item.rality[0],
      item.rality[item.rality.length > 1 ? 1 : 0],
      item.attribute,
      item.series,
      item.image[0],
      item.image[item.image.length > 1 ? 1 : 0],
      item.episode,
    ];
    if (item.status.length === 0) {
      row.push("", "", "", "", "", "", "", "", "", "", "", "", "");
    } else {
      row.push(
        item.status[0].total,
        item.status[0].soul,
        item.status[0].voice,
        item.status[0].charm,
        item.status[0].life
      );
      if (item.status.length > 1) {
        row.push(
          item.status[1].total,
          item.status[1].soul,
          item.status[1].voice,
          item.status[1].charm,
          item.status[1].life
        );
      } else {
        row.push("", "", "", "", "");
      }
      row.push(
        item.status[0].suport,
        item.status[0].foldWave,
        item.status[0].luck
      );
    }
    row.push("", "", "", "", "");
    if (item.centerSkill.length === 0) {
      row.push("", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "");
    } else {
      row.push(
        item.centerSkill[0][0].name,
        item.centerSkill[0][0].rank,
        item.centerSkill[0][0].effect,
        item.centerSkill[0][0].conditions
      );
      if (item.centerSkill[0].length > 1) {
        row.push(
          item.centerSkill[0][1].name,
          item.centerSkill[0][1].rank,
          item.centerSkill[0][1].effect,
          item.centerSkill[0][1].conditions
        );
      } else {
        row.push("", "", "", "");
      }
      if (item.centerSkill.length === 1) {
        row.push("", "", "", "", "", "", "", "");
      } else {
        row.push(
          item.centerSkill[1][0].name,
          item.centerSkill[1][0].rank,
          item.centerSkill[1][0].effect,
          item.centerSkill[1][0].conditions
        );
        if (item.centerSkill[1].length > 1) {
          row.push(
            item.centerSkill[1][1].name,
            item.centerSkill[1][1].rank,
            item.centerSkill[1][1].effect,
            item.centerSkill[1][1].conditions
          );
        } else {
          row.push("", "", "", "");
        }
      }
    }
    if (item.activeSkill.length === 0) {
      row.push("", "", "", "", "", "", "", "");
    } else {
      row.push(
        item.activeSkill[0][0].name,
        item.activeSkill[0][0].rank,
        item.activeSkill[0][0].effect,
        item.activeSkill[0][0].conditions
      );
      if (item.activeSkill[0].length > 1) {
        row.push(
          item.activeSkill[0][1].name,
          item.activeSkill[0][1].rank,
          item.activeSkill[0][1].effect,
          item.activeSkill[0][1].conditions
        );
      } else {
        row.push("", "", "", "");
      }
    }
    if (item.liveSkill.length === 0) {
      row.push("", "", "", "", "", "", "", "");
    } else {
      row.push(
        item.liveSkill[0][0].name,
        item.liveSkill[0][0].rank,
        item.liveSkill[0][0].effect,
        item.liveSkill[0][0].conditions
      );
      if (item.liveSkill[0].length > 1) {
        row.push(
          item.liveSkill[0][1].name,
          item.liveSkill[0][1].rank,
          item.liveSkill[0][1].effect,
          item.liveSkill[0][1].conditions
        );
      } else {
        row.push("", "", "", "");
      }
    }
    row.push(item.compatibleDiva.join(","), item.lastUpdated);
    result.push(row);
  }
  const rows = result.map((p) => p.join("\t"));
  const tsv = rows.join("\r");
  fs.writeFileSync(outputPath + "plates.tsv", tsv, { encoding: "utf-8" });
}

mainAsync().catch(console.error);
