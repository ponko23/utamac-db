import fs from "fs";
import rp from "request-promise";

export const baseUrl = "https://xn--pckua3ipc5705b.gamematome.jp";

/**
 * @interface 取得したデータの型
 */
export interface ScrapeData<T> {
  url: string;
  data: T;
  lastUpdated: string;
}
