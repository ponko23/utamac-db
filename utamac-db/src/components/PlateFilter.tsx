import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { plateFilterState } from "../atoms/plate";
import { liveSkillListState } from "../atoms/plate";

type PlateFilterProps = {
  children?: React.ReactNode;
};

export const PlateFilter = (props: PlateFilterProps) => {
  const [filter, setFilter] = useRecoilState(plateFilterState);
  // const [effectiveDivaFilter, setEffectiveDivaFilter] = useRecoilState(
  //   plateEffectiveDivaState
  // );
  const liveSkillList = useRecoilValue(liveSkillListState);

  const generateRalityFilter = () => {
    let results: JSX.Element[] = [];
    filter.rality.forEach((v, k) => {
      results.push(
        <label key={"useRality" + k} style={{ marginRight: 5 }}>
          <input
            type="checkbox"
            checked={v}
            onChange={() =>
              setFilter((f) => {
                return { ...f, rality: f.rality.set(k, !v) };
              })
            }
          />
          {k}
        </label>
      );
    });
    return results;
  };

  const typePattern = new Map([
    ["star", { name: "星", color: "#AAAA44" }],
    ["love", { name: "愛", color: "#AA77AA" }],
    ["life", { name: "命", color: "#44AAAA" }],
  ]);

  const generateTypeFilter = () => {
    let results: JSX.Element[] = [];
    filter.type.forEach((v, k) => {
      results.push(
        <label
          key={"useType" + k}
          style={{ marginRight: 5, color: typePattern.get(k)?.color }}
        >
          <input
            type="checkbox"
            checked={v}
            onChange={() =>
              setFilter((f) => {
                return { ...f, type: f.type.set(k, !v) };
              })
            }
          />
          {typePattern.get(k)?.name}
        </label>
      );
    });
    return results;
  };

  const generateEffectiveDivaFilter = () => {
    let results: JSX.Element[] = [];
    filter.effectiveDiva.forEach((v, k) => {
      results.push(
        <label
          key={"useEffectiveDiva" + k}
          style={{ float: "left", marginRight: 5 }}
        >
          <input
            type="checkbox"
            checked={v}
            onChange={() =>
              setFilter((f) => {
                return { ...f, effectiveDiva: f.effectiveDiva.set(k, !v) };
              })
            }
          />
          {k}
        </label>
      );
    });
    return results;
  };
  return (
    <div
      style={{
        margin: 5,
      }}
    >
      <div>
        レアリティ:
        {generateRalityFilter()}
      </div>
      <hr />
      <div>
        属性:
        {generateTypeFilter()}
      </div>
      <hr />
      <div>
        ライブスキル:
        <select
          value={filter.liveSkill}
          onChange={(e) =>
            setFilter((f) => {
              return { ...f, liveSkill: e.currentTarget.value };
            })
          }
        >
          <option value={""}></option>
          {liveSkillList.map((l, i) => (
            <option key={"skill" + i} value={l}>
              {l}
            </option>
          ))}
        </select>
        <div style={{ marginLeft: 5 }}>
          <div style={{ float: "left" }}>対応歌姫:</div>
          {generateEffectiveDivaFilter()}
        </div>
      </div>
    </div>
  );
};
