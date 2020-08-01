import { CostumeScraper } from "./costume";
import { ScrapeData } from "./scraper";

async function mainAsync() {
  try {
    const outputPath = "../utamac-db/src/resources/";
    const costumeScaper = new CostumeScraper();
    await costumeScaper.scrapeToFileAsync(outputPath);
  } catch (error) {
    throw error;
  }
}

mainAsync().catch(console.error);
