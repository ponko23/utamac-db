import { atom, selector } from "recoil";
import plateList from "../resources/plateList.json";

export interface Plate {
  Id: number;
  Url: string;
  Name: string;
  InitialRarity: number;
  MaxRarity: number;
  Attribute: string;
  InitialImage: string;
  ReleasedImage: string;
  Episod: string;
  CenterSkill: string;
  CenterSkillCondition: string;
  ActiveSkill: string;
  ActiveSkillCondition: string;
  LiveSkill: string;
  LiveSkillCondition: string;
  EffectiveDiva: string[];
  InitialTotal: number;
  MaxTotal: number;
  InitialSoul: number;
  MaxSoul: number;
  InitialVoice: number;
  MaxVoice: number;
  InitialCharm: number;
  MaxCharm: number;
  InitialLife: number;
  MaxLife: number;
  InitialSuport: number;
  MaxSuport: number;
  InitialForldWave: number;
  MaxForldWave: number;
  MaxLuck: number;
  ExpectedLife: number;
  ExpectedScore: number;
  ExpectedItem: number;
  ExpectedForldWave: number;
  ExpectedAttack: number;
  Discription: string;
  Error: [];
}

const initialPlates: Plate[] = plateList;

export const plateState = atom({
  key: "plate",
  default: initialPlates,
});

export const liveSkillListState = atom({
  key: "liveSkillList",
  default: Array.from(
    new Set(initialPlates.map((p) => p.LiveSkill).filter((f) => f !== null))
  ),
});

let initialFavs: Map<number, boolean>;
var json = localStorage.getItem("favsPlate");
if (json !== null) {
  initialFavs = new Map(JSON.parse(json));
} else {
  initialFavs = new Map<number, boolean>();
}

export const favsState = atom({
  key: "favsPlate",
  default: initialFavs,
});

let initialRalities: Map<string, boolean>;
var ralityJson = localStorage.getItem("plateRality");
if (ralityJson !== null) {
  initialRalities = new Map(JSON.parse(ralityJson));
} else {
  initialRalities = new Map([
    ["1", true],
    ["2", true],
    ["3", true],
    ["4", true],
    ["5", true],
    ["6", true],
  ]);
}

let initialTypes: Map<string, boolean>;
var typeJson = localStorage.getItem("plateType");
if (typeJson !== null) {
  initialTypes = new Map(JSON.parse(typeJson));
} else {
  initialTypes = new Map([
    ["star", true],
    ["love", true],
    ["life", true],
  ]);
}

let initialLiveSkill: string;
var liveSkill = localStorage.getItem("liveSkill");
initialLiveSkill = liveSkill !== null ? liveSkill : "";

let initialEffectiveDivas: Map<string, boolean>;
var effectiveDivaJson = localStorage.getItem("plateEffectiveDiva");
if (effectiveDivaJson !== null) {
  initialEffectiveDivas = new Map(JSON.parse(effectiveDivaJson));
} else {
  initialEffectiveDivas = new Map([
    ["フレイア・ヴィオン", true],
    ["美雲・ギンヌメール", true],
    ["カナメ・バッカニア", true],
    ["マキナ・中島", true],
    ["レイナ・プラウラー", true],
    ["ランカ・リー", true],
    ["シェリル・ノーム", true],
    ["ミレーヌ・ジーナス", true],
    ["熱気バサラ", true],
    ["リン・ミンメイ", true],
  ]);
}

export interface PlateFilterSetting {
  rality: Map<string, boolean>;
  type: Map<string, boolean>;
  liveSkill: string;
  effectiveDiva: Map<string, boolean>;
}

export const plateFilterState = atom({
  key: "plateFilterState",
  default: {
    rality: initialRalities,
    type: initialTypes,
    liveSkill: initialLiveSkill,
    effectiveDiva: initialEffectiveDivas,
  } as PlateFilterSetting,
});

export interface FilteredPlate {
  count: number;
  list: Plate[];
}

export const filteredPlateState = selector({
  key: "filteredPlateState",
  get: ({ get }) => {
    const list = get(plateState);
    const filter = get(plateFilterState);

    const filterRality = (p: Plate) =>
      filter.rality.get(p.InitialRarity.toString());
    const filterType = (p: Plate) => filter.type.get(p.Attribute);
    const filterLiveSkill = (p: Plate) => filter.liveSkill === p.LiveSkill;
    const filterEffectiveDiva = (p: Plate) => {
      if (p.EffectiveDiva === null) return true;
      return p.EffectiveDiva.some((v) => filter.effectiveDiva.get(v));
    };
    const skipRality = Array.from(filter.rality.values()).every((v) => v);
    const skipType = Array.from(filter.type.values()).every((v) => v);
    const skipLiveSkill = filter.liveSkill === "";
    const skipEffectiveDiva = Array.from(filter.effectiveDiva.values()).every(
      (v) => v
    );

    if (skipRality && skipType && skipLiveSkill && skipEffectiveDiva) {
      return { count: list.length, list: list } as FilteredPlate;
    }
    var results = list.filter(
      (p) =>
        (skipRality || filterRality(p)) &&
        (skipType || filterType(p)) &&
        (skipLiveSkill || filterLiveSkill(p)) &&
        (skipEffectiveDiva || filterEffectiveDiva(p))
    );
    return {
      count: results.length,
      list: results,
    } as FilteredPlate;
    // TODO : お気に入りを使ってフィルタリングするかどうかを指定するフィルタリング項目を画面とfavsStateに追加する（でもlocalstorageに保存するのは配列のみにしたい）
    //var usedFavs = usedType.filter((item) => favs.find((f) => f === item.Id));
  },
});

export const platePagingState = atom({
  key: "paging",
  default: {
    current: 1,
    numberOf: 10,
  },
});

export const pagedPlateState = selector({
  key: "pagedPlateState",
  get: ({ get }) => {
    const filteredList = get(filteredPlateState);
    const paging = get(platePagingState);
    const count = filteredList.count;
    if (count <= paging.numberOf) return filteredList.list;
    const pages = Math.ceil(count / paging.numberOf);
    const current = paging.current > pages ? pages : paging.current;
    return filteredList.list.slice(
      paging.numberOf * (current - 1),
      paging.numberOf * current
    );
  },
});
