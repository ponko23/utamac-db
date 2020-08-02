"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.costumeScraper = void 0;
const cheerio_1 = __importDefault(require("cheerio"));
const fs_1 = __importDefault(require("fs"));
const request_promise_1 = __importDefault(require("request-promise"));
const baseUrl = "https://xn--pckua3ipc5705b.gamematome.jp";
const url = "https://xn--pckua3ipc5705b.gamematome.jp/game/977/wiki/%e6%ad%8c%e5%a7%ab_%e8%a1%a3%e8%a3%85";
async function costumeScraper(outputPath) {
    try {
        const filePath = outputPath + "costumes.json";
        const html = await request_promise_1.default(url);
        const $ = cheerio_1.default.load(html);
        const lastUpdated = $(".last-updated time").first().html();
        if (fs_1.default.existsSync(filePath)) {
            const oldJson = fs_1.default.readFileSync(filePath, { encoding: "utf-8" });
            const old = JSON.parse(oldJson);
            if (old.lastUpdated === lastUpdated) {
                console.log(this.fileName + " : 取得済み");
                return;
            }
        }
        // headerを飛ばす
        const links = $(".page table>tbody>tr>td>b>a")
            .toArray()
            .map((e) => $(e).attr("href"));
        const costumes = [];
        for (let link of links) {
            const item = await getHowToGet(link);
            costumes.push(item);
        }
        const json = JSON.stringify({
            url,
            data: costumes,
            lastUpdated,
        });
        fs_1.default.writeFileSync(outputPath + "costumes.json", json, { encoding: "utf-8" });
    }
    catch (error) {
        throw error;
    }
}
exports.costumeScraper = costumeScraper;
async function getHowToGet(uri) {
    try {
        const html = await request_promise_1.default(baseUrl + uri);
        const $ = cheerio_1.default.load(html);
        const name = $(".page h1").text();
        const image = $(".page img").first().attr("src");
        const rows = $(".page table>tbody>tr");
        const diva = rows.find("td:contains(歌姫)").next().text();
        let howToGet = rows.find("td:contains(入手方法)").next().text();
        const hoToGetMatch = howToGet.match("「(.*)」");
        if (hoToGetMatch) {
            howToGet = hoToGetMatch[1];
        }
        let effect = rows.find("td:contains(効果)").next().text();
        const effectMatch = effect.match("(.*)※");
        if (effectMatch) {
            effect = effectMatch[1];
        }
        const lastUpdated = $(".page .last-updated time").text();
        return {
            uri,
            name,
            diva,
            image,
            howToGet,
            effect,
            lastUpdated,
        };
    }
    catch (error) {
        throw error;
    }
}
//# sourceMappingURL=costume.js.map