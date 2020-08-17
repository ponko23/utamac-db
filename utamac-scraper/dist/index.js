"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const costume_1 = __importDefault(require("./costume"));
const diva_1 = __importDefault(require("./diva"));
const episode_1 = __importDefault(require("./episode"));
const plate_1 = __importDefault(require("./plate"));
const updatehistory_1 = __importDefault(require("./updatehistory"));
async function mainAsync() {
    try {
        const outputPath = "../utamac-db/src/resources/";
        updatehistory_1.default.setupResourcesPath(outputPath);
        updatehistory_1.default.useCache = true; // 上手くいかない
        updatehistory_1.default.load();
        await diva_1.default();
        await episode_1.default();
        await costume_1.default();
        await plate_1.default();
        updatehistory_1.default.save();
    }
    catch (error) {
        console.log(Object.keys(error), error.message);
        throw error;
    }
}
mainAsync().catch(console.error);
//# sourceMappingURL=index.js.map