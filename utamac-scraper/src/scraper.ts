/**
 * @interface 取得したデータの型
 */
export interface ScrapeData<T> {
  url: string;
  data: T;
  lastUpdated: string;
}
