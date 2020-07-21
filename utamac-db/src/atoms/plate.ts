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

export type RalityType = {
  rality: number;
  use: boolean;
};

export type PlateType = {
  type: string;
  use: boolean;
};

export type ExpectedValue = {
  name: string;
  has: boolean | null; // has expected value? yes:true / no:false / both:null
};

export interface PlateFilter {
  useRality: RalityType[];
  useType: PlateType[];
  hasExpected: ExpectedValue[];
}

const initialPlateFilter: PlateFilter = {
  useRality: [
    { rality: 6, use: true },
    { rality: 5, use: true },
    { rality: 4, use: true },
    { rality: 3, use: true },
    { rality: 2, use: true },
    { rality: 1, use: true },
  ],
  useType: [
    { type: "star", use: true },
    { type: "love", use: true },
    { type: "life", use: true },
  ],
  hasExpected: [
    { name: "Life", has: null },
    { name: "Score", has: null },
    { name: "Item", has: null },
    { name: "ForldWave", has: null },
    { name: "Attack", has: null },
  ],
};

export const plateFilterState = atom({
  key: "filter",
  default: initialPlateFilter,
});

export const filteredPlateState = selector({
  key: "filteredPlateState",
  get: ({ get }) => {
    const filter = get(plateFilterState);
    const list = get(plateState);
    return list
      .filter(
        (item) =>
          filter.useRality.find((f) => f.rality === item.InitialRarity)?.use
      )
      .filter(
        (item) => filter.useType.find((f) => f.type === item.Attribute)?.use
      );
  },
});

export interface PlatePaging {
  current: number;
  pages: number;
  numberOf: number;
}

const initialPlatePaging = {
  current: 1,
  pages: 1,
  numberOf: 10,
};

export const platePagingState = atom({
  key: "paging",
  default: initialPlatePaging,
});

export const pagedPlateState = selector({
  key: "pagedPlateState",
  get: ({ get }) => {
    const filteredList = get(filteredPlateState);
    const paging = get(platePagingState);
    const count = filteredList.length;
    if (count <= paging.numberOf) return filteredList;
    const pages = Math.ceil(count / paging.numberOf);
    const current = paging.current > pages ? paging.pages : paging.current;
    return filteredList.slice(
      paging.numberOf * (current - 1),
      paging.numberOf * current
    );
  },
});
