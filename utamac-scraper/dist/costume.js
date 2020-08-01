"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CostumeScraper = void 0;
const scraper_1 = require("./scraper");
class CostumeScraper extends scraper_1.RootScraper {
    constructor() {
        super();
        this.url = "https://xn--pckua3ipc5705b.gamematome.jp/game/977/wiki/%e6%ad%8c%e5%a7%ab_%e8%a1%a3%e8%a3%85";
        this.fileName = "costumes";
    }
    async scrapeAsync(old) {
        try {
            const html = await super.getHtmlAsync();
            const $ = this.getScraper(html);
            const lastUpdated = $(".last-updated time").first().html();
            if (old && old.lastUpdated == lastUpdated) {
                console.log(this.fileName + " : 取得済み");
                return null;
            }
            // ここで既存ファイルも読み込んで最終更新日のチェックを行い、データを生成処理を進めるか？更新差分を追記するか？とかを切り分けたい
            // 初期判定処理自体を基底クラスの方で済ませたい
            const items = $(".page table:first-child>tbody>tr");
            const costumes = [];
            items.each((i, element) => {
                const data = $(element)
                    .find("td")
                    .map((i2, td) => td)
                    .toArray();
                const name = $(data[1]).find("b>a").text();
                const diva = $(data[0]).find("b").text();
                const effect = $(data[2]).text();
                const url = $(data[1]).find("a").attr("href");
                const image = $(data[1]).find("a>img").attr("src");
                if (name && diva && effect) {
                    costumes.push({
                        id: costumes.length + 1,
                        name,
                        diva,
                        effect,
                        url,
                        image,
                    });
                }
            });
            return {
                url: this.url,
                data: costumes,
                lastUpdated: lastUpdated,
            };
        }
        catch (err) {
            throw err;
        }
    }
}
exports.CostumeScraper = CostumeScraper;
//# sourceMappingURL=costume.js.map