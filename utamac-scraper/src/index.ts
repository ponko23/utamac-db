import { costumeScraperAsync } from "./costume";

async function mainAsync() {
  try {
    const outputPath = "../utamac-db/src/resources/";
    await costumeScraperAsync(outputPath);
  } catch (error) {
    console.log(Object.keys(error), error.message);
    throw error;
  }
}

mainAsync().catch(console.error);
