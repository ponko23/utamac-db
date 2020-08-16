import fs from "fs";
import rp from "request-promise";
import cheerio from "cheerio";

/**
 * URLを安全に連結する。オブジェクトが渡されるとquery parameterとして組み立てて連結する
 * @param param
 */
function generateUrl(...param: any[]) {
  if (!param || param.length < 1 || typeof param[0] !== "string")
    throw new Error("URL生成に失敗しました。");

  let url = param[0];
  let hasQuery = false;
  if (!url.match(/^https*:\/\/[\w%\-\.\/]*/))
    throw new Error("先頭パラメーターがURL形式ではありません。");
  if (param.length === 1) return url;
  for (let i = 1; i < param.length; i++) {
    if (typeof param[i] === "string") {
      // 手動でクエリパラメーターを組み立てたい場合、=入ってないとかまでは知らん
      if (i === 1 && param[i].match(/^\?/)) {
        url += param[i];
        hasQuery = true;
      } else if (hasQuery) {
        url + "&" + param[i].replace(/^[\?\/]*/, "");
      } else {
        if (!url.match(/$\//)) url += "/";
        url += param[i].replace(/^\/+/, "");
      }
    } else {
      url = url.replace(/$[\?\/]/, "");
      for (const [key, value] of param[i]) {
        url += `${hasQuery ? "&" : "?"}${key}=${value}`;
        if (!hasQuery) hasQuery = true;
      }
    }
  }
  return url;
}

/**
 * URLの最後のuriを取得する
 * @param url
 */
function getLastUri(url: string): string {
  const array = url.split("/");
  for (const uri of array.reverse()) {
    if (uri !== "") return uri;
  }
  return "";
}

/**
 * 2次元配列のx,y軸を入れ替える
 * @param source
 */
function transpose<T>(source: T[][]): T[][] {
  try {
    if (source === null || source.length === 0 || source[0].length === 0)
      return [];
    return source[0].map((_, c) => source.map((r) => r[c]));
  } catch (error) {
    throw error;
  }
}

export default {
  transpose,
  getLastUri,
  generateUrl,
};
