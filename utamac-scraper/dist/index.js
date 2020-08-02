"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const costume_1 = require("./costume");
async function mainAsync() {
    try {
        const outputPath = "../utamac-db/src/resources/";
        await costume_1.costumeScraper(outputPath);
        // const costumeScaper = new CostumeScraper();
        // await costumeScaper.scrapeToFileAsync(outputPath);
    }
    catch (error) {
        console.log(Object.keys(error), error.message);
        throw error;
    }
}
mainAsync().catch(console.error);
//# sourceMappingURL=index.js.map