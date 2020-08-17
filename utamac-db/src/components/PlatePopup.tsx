import React, { useState } from "react";
import { platePopupState } from "../atoms/plate";
import {
  Dialog,
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Theme,
  withStyles,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
import { useRecoilState } from "recoil";

const StyledDialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(DialogContent);

const StyledDialogActions = withStyles((theme: Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(DialogActions);

export type PlatePopupProps = {};

export const PlatePopup = () => {
  const [platePopup, setPlatePopup] = useRecoilState(platePopupState);
  const [imageState, setImageState] = useState(false);
  const handleClose = () => {
    setPlatePopup(null);
  };

  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={platePopup !== null}
      >
        {platePopup && (
          <>
            <DialogTitle>
              <Typography>{platePopup.name}</Typography>
              <div style={{ textAlign: "center" }}>
                <img
                  src={platePopup.image[imageState ? 1 : 0]}
                  onClick={() => {
                    if (platePopup.image.length === 1) return;
                    setImageState(!imageState);
                  }}
                  alt=""
                />
              </div>
            </DialogTitle>
            <StyledDialogContent dividers>
              <Typography variant="subtitle2">ステータス</Typography>
              <TableContainer component={Paper}>
                <Table size="small" aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell align="right">初期</TableCell>
                      <TableCell align="center"></TableCell>
                      <TableCell align="right">最大</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        トータル
                      </TableCell>
                      <TableCell align="right">
                        {platePopup.status[0].total}
                      </TableCell>
                      <TableCell align="center">→</TableCell>
                      <TableCell align="right">
                        {platePopup.status[1].total}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        ソウル
                      </TableCell>
                      <TableCell align="right">
                        {platePopup.status[0].soul}
                      </TableCell>
                      <TableCell align="center">→</TableCell>
                      <TableCell align="right">
                        {platePopup.status[1].soul}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        ボイス
                      </TableCell>
                      <TableCell align="right">
                        {platePopup.status[0].voice}
                      </TableCell>
                      <TableCell align="center">→</TableCell>
                      <TableCell align="right">
                        {platePopup.status[1].voice}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        チャーム
                      </TableCell>
                      <TableCell align="right">
                        {platePopup.status[0].charm}
                      </TableCell>
                      <TableCell align="center">→</TableCell>
                      <TableCell align="right">
                        {platePopup.status[1].charm}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <Typography variant="subtitle2">センタースキル</Typography>
              {platePopup.centerSkill[0]?.[1] && (
                <TableContainer component={Paper}>
                  <Table size="small" aria-label="a dense table">
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          {platePopup.centerSkill[0][1].name}{" "}
                          {platePopup.centerSkill[0][1].rank}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          {platePopup.centerSkill[0][1].effect}
                          {platePopup.centerSkill[0][1].conditions && (
                            <>
                              <br />
                              <span style={{ color: "red" }}>
                                {platePopup.centerSkill[0][1].conditions}
                              </span>
                            </>
                          )}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
              <Typography variant="subtitle2">アクティブ</Typography>
              {platePopup.activeSkill[0]?.[1] && (
                <TableContainer component={Paper}>
                  <Table size="small" aria-label="a dense table">
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          {platePopup.activeSkill[0][1].name}{" "}
                          {platePopup.activeSkill[0][1].rank}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          {platePopup.activeSkill[0][1].effect}
                          {platePopup.activeSkill[0][1].conditions && (
                            <>
                              <br />
                              <span style={{ color: "red" }}>
                                {platePopup.activeSkill[0][1].conditions}
                              </span>
                            </>
                          )}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
              <Typography variant="subtitle2">ライブ</Typography>
              {platePopup.liveSkill[0]?.[1] && (
                <TableContainer component={Paper}>
                  <Table size="small" aria-label="a dense table">
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          {platePopup.liveSkill[0][1].name}{" "}
                          {platePopup.liveSkill[0][1].rank}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          {platePopup.liveSkill[0][1].effect}
                          {platePopup.liveSkill[0][1].conditions && (
                            <>
                              <br />
                              <span style={{ color: "red" }}>
                                {platePopup.liveSkill[0][1].conditions}
                              </span>
                            </>
                          )}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </StyledDialogContent>
            <StyledDialogActions>
              <Button autoFocus onClick={handleClose} color="primary">
                close
              </Button>
            </StyledDialogActions>
          </>
        )}
      </Dialog>
    </div>
  );
};
