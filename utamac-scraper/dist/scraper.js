"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RootScraper = exports.Scraper = void 0;
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = __importDefault(require("cheerio"));
const fs_1 = __importDefault(require("fs"));
class Scraper {
    constructor() { }
    /**
     *
     */
    async getHtmlAsync() {
        try {
            const AxiosInstance = axios_1.default.create();
            const response = await AxiosInstance.get(this.url);
            return response.data;
        }
        catch (err) {
            throw err;
        }
    }
    /** htmlテキストを読み込ませたcheerioオブジェクトを取得する
     * @param html 解析するhtmlテキスト
     */
    getScraper(html) {
        try {
            return cheerio_1.default.load(html);
        }
        catch (err) {
            throw err;
        }
    }
}
exports.Scraper = Scraper;
class RootScraper extends Scraper {
    /** コンストラクタ */
    constructor() {
        super();
    }
    /** 取得したデータをファイルに保存する
     * @param outputPath 保存先ディレクトリ名
     */
    async scrapeToFileAsync(outputPath) {
        try {
            const fullpath = outputPath + this.fileName + ".json";
            let old = null;
            if (fs_1.default.existsSync(fullpath)) {
                const buff = fs_1.default.readFileSync(fullpath, { encoding: "utf-8" });
                old = JSON.parse(buff.toString());
            }
            const object = await this.scrapeAsync(old);
            if (object) {
                fs_1.default.writeFileSync(outputPath + this.fileName + ".json", JSON.stringify(object), {
                    encoding: "utf-8",
                });
            }
        }
        catch (err) {
            throw err;
        }
    }
}
exports.RootScraper = RootScraper;
//# sourceMappingURL=scraper.js.map