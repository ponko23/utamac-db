"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const costume_1 = require("./costume");
async function mainAsync() {
    try {
        const outputPath = "../utamac-db/src/resources/";
        const costumeScaper = new costume_1.CostumeScraper();
        await costumeScaper.scrapeToFileAsync(outputPath);
    }
    catch (error) {
        throw error;
    }
}
mainAsync().catch(console.error);
//# sourceMappingURL=index.js.map