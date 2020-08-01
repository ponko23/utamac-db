import axios from "axios";
import cheerio from "cheerio";
import fs from "fs";

/**
 * @interface 取得したデータの型
 */
export interface ScrapeData<T> {
  url: string;
  data: T;
  lastUpdated: string;
}

export abstract class Scraper<T> {
  /** 解析するhtmlテキストのurl */
  public abstract url: string;

  /** コンストラクタ */
  constructor() {}

  /** htmlテキストを取得する */
  protected async getHtmlAsync(): Promise<string> {
    try {
      const AxiosInstance = axios.create();
      const response = await AxiosInstance.get(this.url);
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  /** htmlテキストを読み込ませたcheerioオブジェクトを取得する
   * @param html 解析するhtmlテキスト
   */
  protected getScraper(html: string): CheerioStatic {
    try {
      return cheerio.load(html);
    } catch (err) {
      throw err;
    }
  }

  /** データを取得する */
  public abstract async scrapeAsync(
    old?: ScrapeData<T>
  ): Promise<ScrapeData<T>>;
}

export abstract class RootScraper<T> extends Scraper<T> {
  /** 保存時のファイル名
   * @abstract */
  public abstract fileName: string;

  /** コンストラクタ */
  constructor() {
    super();
  }

  /** 取得したデータをファイルに保存する
   * @param outputPath 保存先ディレクトリ名
   */
  public async scrapeToFileAsync(outputPath: string) {
    try {
      const fullpath = outputPath + this.fileName + ".json";
      let old: ScrapeData<T> = null;
      if (fs.existsSync(fullpath)) {
        const buff = fs.readFileSync(fullpath, { encoding: "utf-8" });
        old = JSON.parse(buff.toString()) as ScrapeData<T>;
      }
      const object = await this.scrapeAsync(old);
      if (object) {
        fs.writeFileSync(
          outputPath + this.fileName + ".json",
          JSON.stringify(object),
          {
            encoding: "utf-8",
          }
        );
      }
    } catch (err) {
      throw err;
    }
  }
}
