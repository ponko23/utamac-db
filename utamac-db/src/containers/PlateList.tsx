import React from "react";
import { useRecoilValue } from "recoil";
import { pagedPlateState } from "../atoms/plate";
import { PlateCard } from "../components/PlateCard";

type PlateListProps = {
  children?: React.ReactNode;
};

export const PlateList = (props: PlateListProps) => {
  const plates = useRecoilValue(pagedPlateState);

  return (
    <ul style={{ margin: 5, padding: 0 }}>
      {plates.map((p) => (
        <li key={p.Id} style={{ listStyle: "none", float: "left", margin: 2 }}>
          <PlateCard plate={p} />
        </li>
      ))}
    </ul>
  );
};
