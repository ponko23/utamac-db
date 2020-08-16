import { atom, selector } from "recoil";
import plates from "../resources/plates.json";

export interface Skill {
  name: string;
  rank: string;
  conditions: string;
}

export interface PlateStatus {
  total: number;
  soul: number;
  voice: number;
  charm: number;
  life: number;
  suport: number;
  foldWave: number;
  luck: number;
}

export interface Plate {
  id: string;
  uri: string;
  name: string;
  rality: number[];
  attribute: string;
  series: string;
  image: string[];
  episode: string;
  centerSkill: Skill[][];
  activeSkill: Skill[][];
  liveSkill: Skill[][];
  compatibleDiva: string[];
  status: PlateStatus[];
  lastUpdated: string;
}

// export interface Plate {
//   Id: number;
//   Url: string;
//   Name: string;
//   InitialRarity: number;
//   MaxRarity: number;
//   Attribute: string;
//   InitialImage: string;
//   ReleasedImage: string;
//   Episod: string;
//   CenterSkill: string;
//   CenterSkillCondition: string;
//   ActiveSkill: string;
//   ActiveSkillCondition: string;
//   LiveSkill: string;
//   LiveSkillCondition: string;
//   EffectiveDiva: string[];
//   InitialTotal: number;
//   MaxTotal: number;
//   InitialSoul: number;
//   MaxSoul: number;
//   InitialVoice: number;
//   MaxVoice: number;
//   InitialCharm: number;
//   MaxCharm: number;
//   InitialLife: number;
//   MaxLife: number;
//   InitialSuport: number;
//   MaxSuport: number;
//   InitialForldWave: number;
//   MaxForldWave: number;
//   MaxLuck: number;
//   ExpectedLife: number;
//   ExpectedScore: number;
//   ExpectedItem: number;
//   ExpectedForldWave: number;
//   ExpectedAttack: number;
//   Discription: string;
//   Error: [];
// }

const initialPlates: Plate[] = plates.data;

export const plateState = atom({
  key: "plate",
  default: initialPlates,
});

export const centerSkillListState = atom({
  key: "centerSkillList",
  default: Array.from(
    new Set(
      initialPlates
        .flatMap((f) => f.centerSkill)
        .flat()
        .map((m) => m.name)
    )
  ),
});

export const activeSkillListState = atom({
  key: "activeSkillList",
  default: Array.from(
    new Set(
      initialPlates
        .flatMap((f) => f.activeSkill)
        .flat()
        .map((m) => m.name)
    )
  ),
});

export const liveSkillListState = atom({
  key: "liveSkillList",
  default: Array.from(
    new Set(
      initialPlates
        .flatMap((f) => f.liveSkill)
        .flat()
        .map((m) => m.name)
    )
  ),
});

let initialFavs: Map<string, boolean>;
var json = localStorage.getItem("favsPlate");
if (json !== null) {
  initialFavs = new Map(JSON.parse(json));
} else {
  initialFavs = new Map<string, boolean>();
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

export const defaultAttributes = new Map([
  ["star", true],
  ["love", true],
  ["life", true],
]);
let initialAttributes: Map<string, boolean>;
var attributeJson = localStorage.getItem("plateAttribute");
if (attributeJson !== null) {
  initialAttributes = new Map(JSON.parse(attributeJson));
} else {
  initialAttributes = new Map(defaultAttributes);
}

let initialCenterSkill: string;
var centerSkill = localStorage.getItem("cemterSkill");
initialCenterSkill = centerSkill !== null ? centerSkill : "";

let initialActiveSkill: string;
var activeSkill = localStorage.getItem("activeSkill");
initialActiveSkill = activeSkill !== null ? activeSkill : "";

let initialLiveSkill: string;
var liveSkill = localStorage.getItem("liveSkill");
initialLiveSkill = liveSkill !== null ? liveSkill : "";

export const defaultCompatibleDivas = new Map([
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
let initialCompatibleDivas: Map<string, boolean>;
var compatibleDivaJson = localStorage.getItem("plateCompatibleDiva");
if (compatibleDivaJson !== null) {
  initialCompatibleDivas = new Map(JSON.parse(compatibleDivaJson));
} else {
  initialCompatibleDivas = new Map(defaultCompatibleDivas);
}

export interface PlateFilterSetting {
  rality: Map<string, boolean>;
  attribute: Map<string, boolean>;
  centerSkill: string;
  activeSkill: string;
  liveSkill: string;
  compatibleDiva: Map<string, boolean>;
}

export const plateFilterSettingState = atom({
  key: "plateFilterSettingState",
  default: {
    rality: initialRalities,
    attribute: initialAttributes,
    centerSkill: initialCenterSkill,
    activeSkill: initialActiveSkill,
    liveSkill: initialLiveSkill,
    compatibleDiva: initialCompatibleDivas,
  } as PlateFilterSetting,
});

export interface PlateFilterState {
  useRality: boolean;
  useAttribute: boolean;
  useCenterSkill: boolean;
  useActiveSkill: boolean;
  useLiveSkill: boolean;
  useCompatibleDiva: boolean;
  useFilterCount: number;
}

export const plateFilterState = selector({
  key: "plateFilterState",
  get: ({ get }) => {
    const filter = get(plateFilterSettingState);
    let state: PlateFilterState = {
      useRality: false,
      useAttribute: false,
      useCenterSkill: false,
      useActiveSkill: false,
      useLiveSkill: false,
      useCompatibleDiva: false,
      useFilterCount: 0,
    };

    if (!Array.from(filter.rality.values()).every((v) => v)) {
      state.useRality = true;
      state.useFilterCount++;
    }
    if (!Array.from(filter.attribute.values()).every((v) => v)) {
      state.useAttribute = true;
      state.useFilterCount++;
    }
    if (filter.centerSkill !== "") {
      state.useCenterSkill = true;
      state.useFilterCount++;
    }
    if (filter.activeSkill !== "") {
      state.useActiveSkill = true;
      state.useFilterCount++;
    }
    if (filter.liveSkill !== "") {
      state.useLiveSkill = true;
      state.useFilterCount++;
    }
    if (!Array.from(filter.compatibleDiva.values()).every((v) => v)) {
      state.useCompatibleDiva = true;
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
      filter.rality.get(p.rality[0].toString());
    const filterType = (p: Plate) => filter.attribute.get(p.attribute);
    const filterCenterSkill = (p: Plate) =>
      p.centerSkill
        .flat()
        .flatMap((f) => f.name)
        .indexOf(filter.centerSkill) !== -1;
    const filterActiveSkill = (p: Plate) =>
      p.activeSkill
        .flat()
        .flatMap((f) => f.name)
        .indexOf(filter.activeSkill) !== -1;
    const filterLiveSkill = (p: Plate) =>
      p.liveSkill
        .flat()
        .flatMap((f) => f.name)
        .indexOf(filter.liveSkill) !== -1;
    const filterEffectiveDiva = (p: Plate) => {
      if (p.compatibleDiva === null) return true;
      return p.compatibleDiva.some((v) => filter.compatibleDiva.get(v));
    };

    if (filterState.useFilterCount === 0) {
      return { count: list.length, list: list } as FilteredPlate;
    }
    var results = list.filter(
      (p) =>
        (!filterState.useRality || filterRality(p)) &&
        (!filterState.useAttribute || filterType(p)) &&
        (!filterState.useCenterSkill || filterCenterSkill(p)) &&
        (!filterState.useActiveSkill || filterActiveSkill(p)) &&
        (!filterState.useLiveSkill || filterLiveSkill(p)) &&
        (!filterState.useCompatibleDiva || filterEffectiveDiva(p))
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
