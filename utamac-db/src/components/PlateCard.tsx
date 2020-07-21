import React, { useState } from "react";
import { Plate, favsState } from "../atoms/plate";
import { useRecoilState } from "recoil";

export type PlateCardProps = {
  plate: Plate;
  children?: React.ReactNode;
};

export const PlateCard = (props: PlateCardProps) => {
  var plate = props.plate;
  const [released, setReleased] = useState(false);
  const [favs, setFavs] = useRecoilState(favsState);
  const onChangeRality = () => {
    if (plate.InitialRarity === plate.MaxRarity) return;
    setReleased(!released);
  };

  const getPlateColor = (a: string) => {
    switch (a) {
      case "star":
        return "#FFFF99";
      case "love":
        return "#FFCCFF";
      case "life":
        return "#99FFFF";
      default:
        return "white";
    }
  };

  const onOpenDetail = (plate: Plate) => {};
  const onFavChange = (id: number) => {
    var index = favs.indexOf(id);
    if (index === -1) {
      setFavs((f) => {
        return [...f, id].sort();
      });
    } else {
      setFavs((f) => {
        return f.filter((p) => p !== id).sort();
      });
    }
  };

  return (
    <div
      style={{
        margin: 2,
        padding: 5,
        clear: "left",
        boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
        transition: "0.3s",
        background: getPlateColor(plate.Attribute),
      }}
    >
      <div style={{ clear: "left" }}>
        <h4 style={{ width: "95%", margin: 0, float: "left" }}>{plate.Name}</h4>
        <span style={{ float: "left" }} onClick={() => onFavChange(plate.Id)}>
          {favs.indexOf(plate.Id) !== -1 ? "★" : "☆"}
        </span>
      </div>
      <img
        src={released ? plate.ReleasedImage : plate.InitialImage}
        alt={plate.Name}
        style={{ width: "60%", float: "left" }}
        onClick={onChangeRality}
      />
      <div style={{ float: "left", width: "40%" }}>
        <ul
          style={{
            listStyle: "none",
            float: "left",
            paddingLeft: 0,
            marginLeft: 5,
          }}
        >
          <li>Total:</li>
          <li>Voice:</li>
          <li>Soul:</li>
          <li>Charm:</li>
        </ul>
        <ul
          style={{
            listStyle: "none",
            float: "left",
            paddingLeft: 0,
            textAlign: "right",
          }}
        >
          <li>{plate.MaxTotal}</li>
          <li>{plate.MaxVoice}</li>
          <li>{plate.MaxSoul}</li>
          <li>{plate.MaxCharm}</li>
        </ul>
      </div>
      <div style={{ clear: "left" }}>
        <ul style={{ listStyle: "none", float: "left", paddingLeft: 0 }}>
          <li>Center:</li>
          <li>Active:</li>
          <li>Live:</li>
        </ul>
        <ul style={{ listStyle: "none", float: "left", paddingLeft: 0 }}>
          <li>{plate.CenterSkill}</li>
          <li>{plate.ActiveSkill}</li>
          <li>{plate.LiveSkill}</li>
        </ul>
        <div style={{ clear: "left" }}>
          <button onClick={() => onOpenDetail(plate)} style={{ width: "100%" }}>
            Detail
          </button>
        </div>
      </div>
    </div>
  );
};
