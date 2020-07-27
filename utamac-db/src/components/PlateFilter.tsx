import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  plateFilterState,
  liveSkillListState,
  defaultRalities,
  defaultTypes,
  defaultEffectiveDivas,
} from "../atoms/plate";
import { ToggleButton } from "@material-ui/lab";
import { Typography } from "@material-ui/core";

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

const typeIcons = new Map([
  [
    "star",
    "https://cdn-image.pf.dena.com/fa9c327e33426cd5e3dff097aa3feee754c90f9a/1/23ae18f6-1a63-33f8-bc97-bc1708d7d405.png",
  ],
  [
    "love",
    "https://cdn-image.pf.dena.com/fa9c327e33426cd5e3dff097aa3feee754c90f9a/1/1406e264-badf-3721-bcd0-be3375593d1d.png",
  ],
  [
    "life",
    "https://cdn-image.pf.dena.com/fa9c327e33426cd5e3dff097aa3feee754c90f9a/1/f6c1446e-9946-3f65-900d-0fd3236b0afb.png",
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
        <ToggleButton
          key={"rality" + k}
          selected={v}
          value={v}
          onChange={() =>
            setFilter((f) => {
              return { ...f, rality: f.rality.set(k, !v) };
            })
          }
          style={{
            paddingLeft: 7,
            paddingRight: 7,
            paddingTop: 0,
            paddingBottom: 0,
            margin: 1,
          }}
        >
          {k}
        </ToggleButton>
      );
    });
    return results;
  };

  const generateTypeFilter = () => {
    let results: JSX.Element[] = [];
    filter.type.forEach((v, k) => {
      results.push(
        <ToggleButton
          key={"type" + k}
          value={v}
          selected={v}
          onChange={() =>
            setFilter((f) => {
              return { ...f, type: f.type.set(k, !v) };
            })
          }
          style={{ padding: 0, margin: 1 }}
        >
          <img src={typeIcons.get(k)} width={30} alt={k} title={k} />
        </ToggleButton>
      );
    });
    return results;
  };

  const generateEffectiveDivaFilter = () => {
    let results: JSX.Element[] = [];
    filter.effectiveDiva.forEach((v, k) => {
      results.push(
        <ToggleButton
          key={"diva" + (results.length + 1)}
          value={v}
          selected={v}
          onChange={() =>
            setFilter((f) => {
              return { ...f, effectiveDiva: f.effectiveDiva.set(k, !v) };
            })
          }
          style={{ padding: 0, marginLeft: 1 }}
        >
          <img src={divaIcons.get(k)} width={30} alt={k} title={k} />
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
        <Typography variant="subtitle2">レアリティ</Typography>
        <ToggleButton
          key={"ralityAll"}
          style={{
            paddingLeft: 7,
            paddingRight: 7,
            paddingTop: 0,
            paddingBottom: 0,
            margin: 1,
          }}
          value={"all"}
          onChange={() =>
            setFilter((f) => {
              return { ...f, rality: new Map(defaultRalities) };
            })
          }
        >
          ALL
        </ToggleButton>
        {generateRalityFilter()}
      </div>
      <div>
        <Typography variant="subtitle2">属性</Typography>
        <ToggleButton
          key={"typeAll"}
          style={{
            paddingLeft: 7,
            paddingRight: 7,
            paddingTop: 3,
            paddingBottom: 3,
            margin: 1,
          }}
          value={"all"}
          onChange={() =>
            setFilter((f) => {
              return { ...f, type: new Map(defaultTypes) };
            })
          }
        >
          ALL
        </ToggleButton>
        {generateTypeFilter()}
      </div>

      <div>
        <Typography variant="subtitle2">ライブスキル</Typography>
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
          <Typography variant="subtitle2">対応歌姫</Typography>
          <ToggleButton
            key={"divaAll"}
            style={{
              paddingLeft: 7,
              paddingRight: 7,
              paddingTop: 3,
              paddingBottom: 3,
              marginLeft: 1,
            }}
            value={"all"}
            onChange={() =>
              setFilter((f) => {
                return { ...f, effectiveDiva: new Map(defaultEffectiveDivas) };
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
