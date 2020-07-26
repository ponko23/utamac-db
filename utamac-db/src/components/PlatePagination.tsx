import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { platePagingState, filteredPlateState } from "../atoms/plate";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      "& > * + *": {
        marginTop: theme.spacing(2),
      },
    },
  })
);

type PlatePaginationProps = {
  children?: React.ReactNode;
};

export const PlatePagination = (props: PlatePaginationProps) => {
  const classes = useStyles();
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

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPaging((p) => {
      return { ...p, current: value };
    });
  };

  return (
    <div className={classes.root}>
      <Pagination
        count={pages}
        size={"small"}
        page={current}
        onChange={handleChange}
      />
    </div>
  );
};
