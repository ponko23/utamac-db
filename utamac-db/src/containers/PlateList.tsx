import React from "react";
import { useRecoilValue } from "recoil";
import { pagedPlateState } from "../atoms/plate";
import { PlateCard } from "../components/PlateCard";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 0,
    },
    item: {
      minWidth: 360,
    },
  })
);

type PlateListProps = {
  children?: React.ReactNode;
};

export const PlateList = (props: PlateListProps) => {
  const classes = useStyles();
  const plates = useRecoilValue(pagedPlateState);

  return (
    <Grid container className={classes.root} spacing={1}>
      {plates.map((p) => (
        <Grid item key={p.Id} className={classes.item}>
          <PlateCard plate={p} />
        </Grid>
      ))}
    </Grid>
  );
};
