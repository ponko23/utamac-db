import React from "react";
import { useRecoilState } from "recoil";
import { plateFilterState } from "../atoms/plate";

type PlateFilterProps = {
  children?: React.ReactNode;
};

export const PlateFilter = (props: PlateFilterProps) => {
  const [filter, setFilter] = useRecoilState(plateFilterState);

  const onChangeUseRality = (i: number) => {
    setFilter((f) => {
      var newValue = !f.useRality[i].use;
      return {
        ...f,
        useRality: [
          ...f.useRality.slice(0, i),
          { ...f.useRality[i], use: newValue },
          ...f.useRality.slice(i + 1),
        ],
      };
    });
  };

  const onChangeUseType = (i: number) => {
    setFilter((f) => {
      var newValue = !f.useType[i].use;
      return {
        ...f,
        useType: [
          ...f.useType.slice(0, i),
          { ...f.useType[i], use: newValue },
          ...f.useType.slice(i + 1),
        ],
      };
    });
  };

  return (
    <div>
      <div>
        レアリティ:
        {filter.useRality.map((r, i) => (
          <label key={"useRality" + i}>
            <input
              type="checkbox"
              checked={r.use}
              onChange={() => onChangeUseRality(i)}
            />
            {r.rality}
          </label>
        ))}
      </div>
      <div>
        属性:
        {filter.useType.map((t, i) => (
          <label key={"useType" + i}>
            <input
              type="checkbox"
              checked={t.use}
              onChange={() => onChangeUseType(i)}
            />
            {t.type}
          </label>
        ))}
      </div>
    </div>
  );
};
