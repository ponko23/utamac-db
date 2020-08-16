"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const costume_1 = require("./costume");
const diva_1 = require("./diva");
const episode_1 = require("./episode");
const plate_1 = require("./plate");
const updatehistory_1 = __importDefault(require("./updatehistory"));
async function mainAsync() {
    try {
        const outputPath = "../utamac-db/src/resources/";
        updatehistory_1.default.useCache = false; // 上手くいかない
        updatehistory_1.default.load(outputPath);
        await diva_1.divaScraperAsync(outputPath);
        await episode_1.episodeScraperAsync(outputPath);
        await costume_1.costumeScraperAsync(outputPath);
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