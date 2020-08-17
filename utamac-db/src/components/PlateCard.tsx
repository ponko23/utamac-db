import React, { useState } from "react";
import { Plate, favsState, platePopupState } from "../atoms/plate";
import { useRecoilState, useSetRecoilState } from "recoil";
import { Paper, Button, IconButton } from "@material-ui/core";
import { StarBorder, Star } from "@material-ui/icons";
import theme from "../theme";
export type PlateCardProps = {
  plate: Plate;
  children?: React.ReactNode;
};

export const PlateCard = (props: PlateCardProps) => {
  var plate = props.plate;
  const [released, setReleased] = useState(false);
  const [favs, setFavs] = useRecoilState(favsState);
  const setPlatePopup = useSetRecoilState(platePopupState);
  const onChangeRality = () => {
    if (plate.rality.length === 1) return;
    setReleased(!released);
  };

  // const getPlateColor = (a: string) => {
  //   switch (a) {
  //     case "star":
  //       return "#FFFF99";
  //     case "love":
  //       return "#FFCCFF";
  //     case "life":
  //       return "#99FFFF";
  //     default:
  //       return "white";
  //   }
  // };

  const onOpenDetail = (plate: Plate) => {
    setPlatePopup(plate);
  };
  const onFavChange = (id: string) => {
    let fav = favs.get(id);
    if (fav === undefined) {
      setFavs((f) => {
        return f.set(id, false);
      });
    } else if (!fav && plate.rality.length !== 1) {
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
      }}
    >
      <div style={{ clear: "both" }}>
        <h4 style={{ margin: 0, float: "left" }}>{plate.name}</h4>
        <IconButton
          style={{
            float: "right",
            color:
              favs.get(plate.id) === undefined
                ? "black"
                : favs.get(plate.id) || plate.rality.length === 1
                ? "purple"
                : "orange",
            padding: 0,
          }}
          size="small"
          onClick={() => onFavChange(plate.id)}
        >
          {favs.get(plate.id) === undefined ? (
            <StarBorder fontSize="small" />
          ) : (
            <Star fontSize="small" />
          )}
        </IconButton>
      </div>
      <img
        src={
          released && plate.image.length > 1 ? plate.image[1] : plate.image[0]
        }
        alt={plate.name}
        style={{ width: "65%", float: "left", clear: "right" }}
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
          <li>Total:{plate.status[1].total}</li>
          <li>Voice:{plate.status[1].voice}</li>
          <li>Soul: {plate.status[1].soul}</li>
          <li>Charm:{plate.status[1].charm}</li>
        </ul>
      </div>
      {/*<div style={{ clear: "left" }}>
         <ul style={{ listStyle: "none", float: "left", paddingLeft: 0 }}>
          <li>
            Center:{plate.centerSkill.flat()[0]?.name}{" "}
            {plate.centerSkill.flat()[0]?.rank}
          </li>
          <li>
            Active:{plate.activeSkill.flat()[0]?.name}{" "}
            {plate.activeSkill.flat()[0]?.rank}
          </li>
          <li>
            Live :{plate.liveSkill.flat()[0]?.name}{" "}
            {plate.liveSkill.flat()[0]?.rank}
          </li>
        </ul> */}
      <div style={{ clear: "left" }}>
        <Button
          onClick={() => onOpenDetail(plate)}
          variant="outlined"
          style={{ width: "100%", marginTop: theme.spacing(1) }}
        >
          Detail
        </Button>
      </div>
    </Paper>
  );
};
