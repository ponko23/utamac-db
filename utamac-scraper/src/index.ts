import costumeScraperAsync from "./costume";
import divaScraperAsync from "./diva";
import episodeScraperAsync from "./episode";
import plateScraperAsync from "./plate";
import UpdateHistories from "./updatehistory";

async function mainAsync() {
  try {
    const outputPath = "../utamac-db/src/data/";
    UpdateHistories.setupResourcesPath(outputPath);
    UpdateHistories.useCache = false; // 上手くいかない
    UpdateHistories.load();
    const divas = await divaScraperAsync();
    const episodes = await episodeScraperAsync();
    const costumes = await costumeScraperAsync();
    const plates = await plateScraperAsync();

    // 取得したjsonを加工してスリムにする

    // 追加のデータをマージする
  } catch (error) {
    console.log(Object.keys(error), error.message);
    throw error;
  } finally {
    UpdateHistories.save();
  }
}

mainAsync().catch(console.error);
