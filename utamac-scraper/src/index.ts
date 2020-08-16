import costumeScraperAsync from "./costume";
import divaScraperAsync from "./diva";
import episodeScraperAsync from "./episode";
import plateScraperAsync from "./plate";
import UpdateHistories from "./updatehistory";

async function mainAsync() {
  try {
    const outputPath = "../utamac-db/src/resources/";
    UpdateHistories.useCache = false; // 上手くいかない
    UpdateHistories.load(outputPath);
    await divaScraperAsync(outputPath);
    await episodeScraperAsync(outputPath);
    await costumeScraperAsync(outputPath);
    await plateScraperAsync(outputPath);
    UpdateHistories.save(outputPath);
  } catch (error) {
    console.log(Object.keys(error), error.message);
    throw error;
  }
}

mainAsync().catch(console.error);
