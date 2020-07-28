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

export const defaultRalities = new Map([
  ["1", true],
  ["2", true],
  ["3", true],
  ["4", true],
  ["5", true],
  ["6", true],
]);
let initialRalities: Map<string, boolean>;
var ralityJson = localStorage.getItem("plateRality");
if (ralityJson !== null) {
  initialRalities = new Map(JSON.parse(ralityJson));
} else {
  initialRalities = new Map(defaultRalities);
}

export const defaultTypes = new Map([
  ["star", true],
  ["love", true],
  ["life", true],
]);
let initialTypes: Map<string, boolean>;
var typeJson = localStorage.getItem("plateType");
if (typeJson !== null) {
  initialTypes = new Map(JSON.parse(typeJson));
} else {
  initialTypes = new Map(defaultTypes);
}

let initialLiveSkill: string;
var liveSkill = localStorage.getItem("liveSkill");
initialLiveSkill = liveSkill !== null ? liveSkill : "";

export const defaultEffectiveDivas = new Map([
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
let initialEffectiveDivas: Map<string, boolean>;
var effectiveDivaJson = localStorage.getItem("plateEffectiveDiva");
if (effectiveDivaJson !== null) {
  initialEffectiveDivas = new Map(JSON.parse(effectiveDivaJson));
} else {
  initialEffectiveDivas = new Map(defaultEffectiveDivas);
}

export interface PlateFilterSetting {
  rality: Map<string, boolean>;
  type: Map<string, boolean>;
  liveSkill: string;
  effectiveDiva: Map<string, boolean>;
}

export const plateFilterSettingState = atom({
  key: "plateFilterSettingState",
  default: {
    rality: initialRalities,
    type: initialTypes,
    liveSkill: initialLiveSkill,
    effectiveDiva: initialEffectiveDivas,
  } as PlateFilterSetting,
});

export interface PlateFilterState {
  useRality: boolean;
  useType: boolean;
  useLiveSkill: boolean;
  useEffectiveDiva: boolean;
  useFilterCount: number;
}

export const plateFilterState = selector({
  key: "plateFilterState",
  get: ({ get }) => {
    const filter = get(plateFilterSettingState);
    let state: PlateFilterState = {
      useRality: false,
      useType: false,
      useLiveSkill: false,
      useEffectiveDiva: false,
      useFilterCount: 0,
    };

    if (!Array.from(filter.rality.values()).every((v) => v)) {
      state.useRality = true;
      state.useFilterCount++;
    }
    if (!Array.from(filter.type.values()).every((v) => v)) {
      state.useType = true;
      state.useFilterCount++;
    }
    if (filter.liveSkill !== "") {
      state.useLiveSkill = true;
      state.useFilterCount++;
    }
    if (!Array.from(filter.effectiveDiva.values()).every((v) => v)) {
      state.useEffectiveDiva = true;
      state.useFilterCount++;
    }
    return state;
  },
});

export interface FilteredPlate {
  count: number;
  list: Plate[];
}

export const filteredPlateState = selector({
  key: "filteredPlateState",
  get: ({ get }) => {
    const list = get(plateState);
    const filter = get(plateFilterSettingState);
    const filterState = get(plateFilterState);
    const filterRality = (p: Plate) =>
      filter.rality.get(p.InitialRarity.toString());
    const filterType = (p: Plate) => filter.type.get(p.Attribute);
    const filterLiveSkill = (p: Plate) => filter.liveSkill === p.LiveSkill;
    const filterEffectiveDiva = (p: Plate) => {
      if (p.EffectiveDiva === null) return true;
      return p.EffectiveDiva.some((v) => filter.effectiveDiva.get(v));
    };

    if (filterState.useFilterCount === 0) {
      return { count: list.length, list: list } as FilteredPlate;
    }
    var results = list.filter(
      (p) =>
        (!filterState.useRality || filterRality(p)) &&
        (!filterState.useType || filterType(p)) &&
        (!filterState.useLiveSkill || filterLiveSkill(p)) &&
        (!filterState.useEffectiveDiva || filterEffectiveDiva(p))
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
