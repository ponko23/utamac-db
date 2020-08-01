import { RootScraper, ScrapeData } from "./scraper";

export interface Costume {
  id: number;
  name: string;
  diva: string;
  effect: string;
  url: string;
  image: string;
}

export class CostumeScraper extends RootScraper<Costume[]> {
  public url =
    "https://xn--pckua3ipc5705b.gamematome.jp/game/977/wiki/%e6%ad%8c%e5%a7%ab_%e8%a1%a3%e8%a3%85";

  public fileName = "costumes";
  constructor() {
    super();
  }

  public async scrapeAsync(old?: ScrapeData<Costume[]>) {
    try {
      const html = await super.getHtmlAsync();
      const $ = this.getScraper(html);
      const lastUpdated = $(".last-updated time").first().html();

      if (old && old.lastUpdated == lastUpdated) {
        console.log(this.fileName + " : 取得済み");
        return null;
      }

      const items = $(".page table:first-child>tbody>tr");
      const costumes: Costume[] = [];
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
    } catch (err) {
      throw err;
    }
  }
}
