import { costumeScraperAsync as scrapeCostumesAsync } from "./costume";
import { divaScraperAsync as scrapeDivasAsync } from "./diva";
import { episodeScraperAsync as scrapeEpisodesAsync } from "./episode";
import { plateScraperAsync as scrapePlatesAsync } from "./plate";
import UpdateHistories from "./updatehistory";

async function mainAsync() {
  try {
    const outputPath = "../utamac-db/src/resources/";
    UpdateHistories.useCache = false; // 上手くいかない
    UpdateHistories.load(outputPath);
    await scrapeDivasAsync(outputPath);
    await scrapeEpisodesAsync(outputPath);
    await scrapeCostumesAsync(outputPath);
    await scrapePlatesAsync(outputPath);
    UpdateHistories.save(outputPath);
  } catch (error) {
    console.log(Object.keys(error), error.message);
    throw error;
  }
}

mainAsync().catch(console.error);
