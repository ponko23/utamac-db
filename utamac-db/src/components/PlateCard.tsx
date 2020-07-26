import React, { useState } from "react";
import { Plate, favsState } from "../atoms/plate";
import { useRecoilState } from "recoil";
import { Paper } from "@material-ui/core";

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
    let fav = favs.get(id);
    if (fav === undefined) {
      setFavs((f) => {
        return f.set(id, false);
      });
    } else if (!fav && plate.InitialRarity !== plate.MaxRarity) {
      setFavs((f) => {
        return f.set(id, true);
      });
    } else {
      setFavs((f) => {
        f.delete(id);
        return f;
      });
    }
  };

  return (
    <Paper
      style={{
        margin: 2,
        padding: 5,
        background: getPlateColor(plate.Attribute),
      }}
    >
      <div style={{ clear: "left" }}>
        <h4 style={{ width: "95%", margin: 0, float: "left" }}>{plate.Name}</h4>
        <span
          style={{
            float: "left",
            color: favs.get(plate.Id) ? "purple" : "black",
          }}
          onClick={() => onFavChange(plate.Id)}
        >
          {favs.get(plate.Id) !== undefined ? "★" : "☆"}
        </span>
      </div>
      <img
        src={released ? plate.ReleasedImage : plate.InitialImage}
        alt={plate.Name}
        style={{ width: "65%", float: "left" }}
        onClick={onChangeRality}
      />
      <div style={{ float: "left", width: "35%" }}>
        <ul
          style={{
            listStyle: "none",
            float: "left",
            paddingLeft: 0,
            marginLeft: 5,
          }}
        >
          <li>Total:{plate.MaxTotal}</li>
          <li>Voice:{plate.MaxVoice}</li>
          <li>Soul: {plate.MaxSoul}</li>
          <li>Charm:{plate.MaxCharm}</li>
        </ul>
      </div>
      <div style={{ clear: "left" }}>
        <ul style={{ listStyle: "none", float: "left", paddingLeft: 0 }}>
          <li>Center:{plate.CenterSkill}</li>
          <li>Active:{plate.ActiveSkill}</li>
          <li>Live :{plate.LiveSkill}</li>
        </ul>
        <div style={{ clear: "left" }}>
          <button onClick={() => onOpenDetail(plate)} style={{ width: "100%" }}>
            Detail
          </button>
        </div>
      </div>
    </Paper>
  );
};
