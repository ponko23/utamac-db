import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { platePagingState, filteredPlateState } from "../atoms/plate";

export const PlatePaging = () => {
  const filteredPlates = useRecoilValue(filteredPlateState);
  const [paging, setPaging] = useRecoilState(platePagingState);

  const count = filteredPlates.length;
  const pages = Math.ceil(count / paging.numberOf);
  const current = paging.current > pages ? pages : paging.current;

  if (pages !== paging.pages || current !== paging.current)
    setPaging((p) => {
      return { ...p, current: current, pages: pages };
    });

  const onChangeCurrentPage = (e: React.FormEvent<HTMLInputElement>) => {
    setPaging((p) => {
      const value = parseInt(e.currentTarget.value);
      return { ...p, current: isNaN(value) ? 1 : value };
    });
  };

  return (
    <div>
      表示:
      <input
        type="number"
        value={paging.current}
        onChange={onChangeCurrentPage}
        min={1}
        max={pages}
      />
    </div>
  );
};
