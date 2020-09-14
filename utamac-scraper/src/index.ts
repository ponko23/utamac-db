import costumeScraperAsync from "./costume";
import divaScraperAsync from "./diva";
import episodeScraperAsync from "./episode";
import plateScraperAsync from "./plate";
import UpdateHistories from "./updatehistory";

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

mainAsync().catch(console.error);
