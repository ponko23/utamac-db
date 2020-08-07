"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const plate_1 = require("./plate");
const updatehistory_1 = __importDefault(require("./updatehistory"));
async function mainAsync() {
    try {
        const outputPath = "../utamac-db/src/resources/";
        updatehistory_1.default.load(outputPath);
        //await scrapeDivasAsync(outputPath);
        //await scrapeEpisodesAsync(outputPath);
        //await scrapeCostumesAsync(outputPath);
        await plate_1.plateScraperAsync(outputPath);
        updatehistory_1.default.save(outputPath);
    }
    catch (error) {
        console.log(Object.keys(error), error.message);
        throw error;
    }
}
mainAsync().catch(console.error);
//# sourceMappingURL=index.js.map