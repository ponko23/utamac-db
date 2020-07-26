import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  plateFilterState,
  liveSkillListState,
  defaultEffectiveDivas,
} from "../atoms/plate";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import Typography from "@material-ui/core/Typography";

type PlateFilterProps = {
  children?: React.ReactNode;
};

const divaIcons = new Map([
  [
    "フレイア・ヴィオン",
    "https://cdn-image.pf.dena.com/fa9c327e33426cd5e3dff097aa3feee754c90f9a/1/dc7c858c-d70b-3ae8-8774-b0978ccc052e.png",
  ],
  [
    "美雲・ギンヌメール",
    "https://cdn-image.pf.dena.com/fa9c327e33426cd5e3dff097aa3feee754c90f9a/1/b658d01c-80d0-31d5-a4ea-8a2d51046d53.png",
  ],
  [
    "カナメ・バッカニア",
    "https://cdn-image.pf.dena.com/fa9c327e33426cd5e3dff097aa3feee754c90f9a/1/a9a410e5-8227-3b2b-afbe-0b5999af2653.png",
  ],
  [
    "マキナ・中島",
    "https://cdn-image.pf.dena.com/fa9c327e33426cd5e3dff097aa3feee754c90f9a/1/2feadf81-1b66-353f-b6eb-0a25bd634660.png",
  ],
  [
    "レイナ・プラウラー",
    "https://cdn-image.pf.dena.com/fa9c327e33426cd5e3dff097aa3feee754c90f9a/1/9f3690c0-c028-35b4-ae03-b346d4610853.png",
  ],
  [
    "ランカ・リー",
    "https://cdn-image.pf.dena.com/fa9c327e33426cd5e3dff097aa3feee754c90f9a/1/a16267e6-6b37-3f7d-9cde-d88bfd3969a8.png",
  ],
  [
    "シェリル・ノーム",
    "https://cdn-image.pf.dena.com/fa9c327e33426cd5e3dff097aa3feee754c90f9a/1/53f86292-f967-3a57-84cd-2f944420a58c.png",
  ],
  [
    "ミレーヌ・ジーナス",
    "https://cdn-image.pf.dena.com/fa9c327e33426cd5e3dff097aa3feee754c90f9a/1/5770e99d-e573-303f-952c-166a4aecc248.png",
  ],
  [
    "熱気バサラ",
    "https://cdn-image.pf.dena.com/fa9c327e33426cd5e3dff097aa3feee754c90f9a/1/04705704-7e76-3c66-b44e-044a018071d0.png",
  ],
  [
    "リン・ミンメイ",
    "https://cdn-image.pf.dena.com/fa9c327e33426cd5e3dff097aa3feee754c90f9a/1/e6e2e53c-b216-37f1-ae81-b13261ae6afe.png",
  ],
]);

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

  const handleEffectiveDiva = (
    event: React.MouseEvent<HTMLElement>,
    key: string
  ) => {
    setFilter((f) => {
      return {
        ...f,
        effectiveDiva: f.effectiveDiva.set(key, !f.effectiveDiva.get(key)),
      };
    });
  };

  const generateEffectiveDivaFilter = () => {
    let results: JSX.Element[] = [];
    filter.effectiveDiva.forEach((v, k) => {
      results.push(
        <ToggleButton
          selected={v}
          onChange={() =>
            setFilter((f) => {
              return { ...f, effectiveDiva: f.effectiveDiva.set(k, !v) };
            })
          }
          style={{ padding: 0 }}
        >
          <img src={divaIcons.get(k)} width={25} alt={k} title={k} />
        </ToggleButton>
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
      <div>
        属性:
        {generateTypeFilter()}
      </div>
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
        <div>
          <Typography variant="subtitle1">対応歌姫</Typography>
          <ToggleButton
            style={{ padding: 0 }}
            value={"all"}
            onChange={() =>
              setFilter((f) => {
                return { ...f, effectiveDiva: defaultEffectiveDivas };
              })
            }
          >
            ALL
          </ToggleButton>
          {generateEffectiveDivaFilter()}
        </div>
      </div>
    </div>
  );
};
