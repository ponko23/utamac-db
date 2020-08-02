"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RootScraper = exports.Scraper = void 0;
const cheerio_1 = __importDefault(require("cheerio"));
const fs_1 = __importDefault(require("fs"));
const request_promise_1 = __importDefault(require("request-promise"));
const baseUrl = "https://xn--pckua3ipc5705b.gamematome.jp";
class Scraper {
    /** コンストラクタ */
    constructor() {
        this.baseUrl = baseUrl;
    }
    /** htmlテキストを取得する */
    getHtmlAsync() {
        try {
            const res = request_promise_1.default(this.url);
            return res.body.toString();
        }
        catch (error) {
            throw error;
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