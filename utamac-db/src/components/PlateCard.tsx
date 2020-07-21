import React, { useState } from "react";
import { Plate } from "../atoms/plate";

export type PlateCardProps = {
  plate: Plate;
  children?: React.ReactNode;
};

export const PlateCard = (props: PlateCardProps) => {
  var plate = props.plate;
  const [released, SetReleased] = useState(false);

  const onChangeRality = () => {
    if (plate.InitialRarity === plate.MaxRarity) return;
    SetReleased(!released);
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
      <h4 style={{ margin: 0 }}>{plate.Name}</h4>
      <img
        src={released ? plate.ReleasedImage : plate.InitialImage}
        alt={plate.Name}
        style={{ width: "50%", float: "left" }}
        onClick={onChangeRality}
      />
      <div style={{ float: "left", width: "50%" }}>
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
        <div style={{ clear: "left" }}></div>
      </div>
    </div>
  );
};
