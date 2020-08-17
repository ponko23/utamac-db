import costumeScraperAsync from "./costume";
import divaScraperAsync from "./diva";
import episodeScraperAsync from "./episode";
import plateScraperAsync from "./plate";
import UpdateHistories from "./updatehistory";

async function mainAsync() {
  try {
    const outputPath = "../utamac-db/src/resources/";
    UpdateHistories.setupResourcesPath(outputPath);
    UpdateHistories.useCache = true; // 上手くいかない
    UpdateHistories.load();
    await divaScraperAsync();
    await episodeScraperAsync();
    await costumeScraperAsync();
    await plateScraperAsync();
  } catch (error) {
    console.log(Object.keys(error), error.message);
    throw error;
  } finally {
    UpdateHistories.save();
  }
}

mainAsync().catch(console.error);
