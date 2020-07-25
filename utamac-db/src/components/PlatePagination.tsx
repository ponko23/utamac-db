import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { platePagingState, filteredPlateState } from "../atoms/plate";

type PlatePaginationProps = {
  children?: React.ReactNode;
};

export const PlatePagination = (props: PlatePaginationProps) => {
  const filteredPlates = useRecoilValue(filteredPlateState);
  const [paging, setPaging] = useRecoilState(platePagingState);

  const count = filteredPlates.count;
  const pages = count === 0 ? 1 : Math.ceil(count / paging.numberOf);
  const current = paging.current > pages ? pages : paging.current;

  if (current !== paging.current) {
    setPaging((p) => {
      return { ...p, current: current };
    });
  }

  const onChangeCurrentPage = (e: React.FormEvent<HTMLInputElement>) => {
    setPaging((p) => {
      const value = parseInt(e.currentTarget.value);
      return { ...p, current: isNaN(value) ? 1 : value };
    });
  };

  const jumpToPage = (i: number) => {
    setPaging((p) => {
      return { ...p, current: i };
    });
  };

  const getJumpPages = () => {
    switch (pages) {
      case 0:
        return [];
      case 1:
        return [1];
      case 2:
        return [1, 2];
      case 3:
        return [1, 2, 3];
      case 4:
        return [1, 2, 3, 4];
      case 5:
        return [1, 2, 3, 4, 5];
      case 6:
        return [1, 2, 3, 4, 5, 6];
      default:
        var last = [-2, -1, 0].map((i) => pages + i);
        return [1, 2, 3, ...last];
    }
  };
  const jumpPages = getJumpPages();

  return (
    <div
      style={{
        margin: 5,
        clear: "left",
      }}
    >
      <hr />
      表示:
      {jumpPages.slice(0, 3).map((b) => (
        <button
          key={"jump" + b}
          onClick={(e) => jumpToPage(b)}
          disabled={paging.current === b}
        >
          {b}
        </button>
      ))}
      ...
      <button
        onClick={() => jumpToPage(paging.current - 1)}
        disabled={paging.current === 1}
      >
        ◀
      </button>
      <input
        type="number"
        value={paging.current}
        onChange={onChangeCurrentPage}
        min={1}
        max={pages}
        style={{
          width: "2em",
        }}
      />
      <button
        onClick={() => jumpToPage(paging.current + 1)}
        disabled={paging.current === pages}
      >
        ▶
      </button>
      ...
      {jumpPages.slice(3, 6).map((b) => (
        <button
          key={"jump" + b}
          onClick={(e) => jumpToPage(b)}
          disabled={paging.current === b}
        >
          {b}
        </button>
      ))}
    </div>
  );
};
