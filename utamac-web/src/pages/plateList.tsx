import React from 'react'
import { makeStyles, withStyles } from '@material-ui/styles'
import {
  Typography,
  Container,
  Theme,
  Grid,
  Paper,
  Button,
  Select,
  InputLabel,
  FormControl,
  AccordionSummary,
  Accordion,
  AccordionDetails,
  DialogContent,
  DialogActions,
  Dialog,
  DialogTitle,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@material-ui/core'
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab'
import { ExpandMore } from '@material-ui/icons'
import platesJson from '../data/plates.json'
import { Plate } from '../../types/json/index'
import _ from 'lodash'
import DivaFilter from '../components/divaFilter'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  grid: {
    display: 'grid',
    gridAutoRows: 'auto',
    gridTemplateColumns: 'repeat(auto-fill, 300px)',
    flexGrow: 1,
    marginTop: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    width: 'auto',
  },
  card: {
    textAlign: 'center',
    margin: 2,
    padding: theme.spacing(1),
    width: 286,
  },
  selected: {
    padding: 3,
    color: 'white',
    background: theme.palette.primary.main,
  },
  notSelect: {
    padding: 3,
    color: 'black',
    background: theme.palette.grey.A100,
  },
  formControl: {
    margin: theme.spacing(1),
  },
  heading: {
    fontSize: theme.typography.pxToRem(12),
    fontWeight: theme.typography.fontWeightRegular,
  },
}))

type Attribute = {
  id: string
  name: string
  icon: string
}
const attributes = [
  {
    id: 'star',
    name: '星',
    icon:
      'https://cdn-image.pf.dena.com/fa9c327e33426cd5e3dff097aa3feee754c90f9a/1/23ae18f6-1a63-33f8-bc97-bc1708d7d405.png',
  },
  {
    id: 'love',
    name: '愛',
    icon:
      'https://cdn-image.pf.dena.com/fa9c327e33426cd5e3dff097aa3feee754c90f9a/1/1406e264-badf-3721-bcd0-be3375593d1d.png',
  },
  {
    id: 'life',
    name: '命',
    icon:
      'https://cdn-image.pf.dena.com/fa9c327e33426cd5e3dff097aa3feee754c90f9a/1/f6c1446e-9946-3f65-900d-0fd3236b0afb.png',
  },
]
type AttributeFilterProps = {
  selectedAttributes: string[]
  setSelectedAttributes: React.Dispatch<React.SetStateAction<string[]>>
}
const AttributeFilter: React.FC<AttributeFilterProps> = ({
  selectedAttributes,
  setSelectedAttributes,
}) => {
  const [all, setAll] = React.useState(true)
  const classes = useStyles()

  const changeSelectedAttributes = (
    event: React.MouseEvent<HTMLElement>,
    newAttributes: string[],
  ) => {
    setSelectedAttributes(newAttributes)
    if (newAttributes.length === 0) {
      setAll(false)
    } else if (newAttributes.length === attributes.length) {
      setAll(true)
    }
  }

  const changeAll = () => {
    if (all) {
      setSelectedAttributes([])
      setAll(false)
    } else {
      setSelectedAttributes(attributes.map(d => d.id))
      setAll(true)
    }
  }

  return (
    <Accordion style={{ marginTop: 4 }}>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography className={classes.heading}>属性</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container>
          <Grid item>
            <ToggleButton
              size="small"
              value="all"
              selected={all}
              onChange={() => changeAll()}
              style={{ height: 52, width: 52 }}
            >
              All
            </ToggleButton>
          </Grid>
          <Grid item>
            <ToggleButtonGroup
              value={selectedAttributes}
              onChange={changeSelectedAttributes}
            >
              {attributes.slice(0, 5).map(d => (
                <ToggleButton size="small" key={d.id} value={d.id}>
                  <img src={d.icon} width={36} />
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  )
}
const centerSkills = Array.from(
  new Set<string>(
    platesJson.data
      .map(p => p.centerSkill[0]?.[0]?.name)
      .filter(f => f && f !== '')
      .sort(),
  ),
)
const activeSkills = Array.from(
  new Set<string>(
    platesJson.data
      .map(p => p.activeSkill[0]?.[0]?.name)
      .filter(f => f && f !== '')
      .sort(),
  ),
)
const liveSkills = Array.from(
  new Set<string>(
    platesJson.data
      .map(p => p.liveSkill[0]?.[0]?.name)
      .filter(f => f && f !== '')
      .sort(),
  ),
)

type SkillFilterState = {
  centerSkill: string
  activeSkill: string
  liveSkill: string
}
type SkillFilterProps = {
  selectedSkill: SkillFilterState
  setSelectedSkill: React.Dispatch<React.SetStateAction<SkillFilterState>>
}
const SkillFilter: React.FC<SkillFilterProps> = ({
  selectedSkill,
  setSelectedSkill,
}) => {
  const classes = useStyles()
  const selectedSkillChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>,
  ) => {
    const name = event.target.name as keyof typeof selectedSkill
    setSelectedSkill({
      ...selectedSkill,
      [name]: event.target.value,
    })
  }

  return (
    <Accordion style={{ marginTop: 4 }}>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography className={classes.heading}>スキル</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container>
          <Grid item>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="selectedCenterSkill">
                センタースキル
              </InputLabel>
              <Select
                native
                value={selectedSkill.centerSkill}
                onChange={selectedSkillChange}
                inputProps={{
                  name: 'centerSkill',
                  id: 'selectedCenterSkill',
                }}
              >
                <option value="" />
                {centerSkills.map((s, i) => (
                  <option key={'centerSkill_' + i} value={s}>
                    {s}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="selectedActiveSkill">
                アクティブスキル
              </InputLabel>
              <Select
                native
                value={selectedSkill.activeSkill}
                onChange={selectedSkillChange}
                inputProps={{
                  name: 'activeSkill',
                  id: 'selectedActiveSkill',
                }}
              >
                <option value="" />
                {activeSkills.map((s, i) => (
                  <option key={'activeSkill_' + i} value={s}>
                    {s}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="selectedLiveSkill">ライブスキル</InputLabel>
              <Select
                native
                value={selectedSkill.liveSkill}
                onChange={selectedSkillChange}
                inputProps={{
                  name: 'liveSkill',
                  id: 'selectedLiveSkill',
                }}
              >
                <option value="" />
                {liveSkills.map((s, i) => (
                  <option key={'liveSkill_' + i} value={s}>
                    {s}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <Button
              disabled={
                selectedSkill.centerSkill === '' &&
                selectedSkill.activeSkill === '' &&
                selectedSkill.liveSkill === ''
              }
              onClick={() =>
                setSelectedSkill({
                  centerSkill: '',
                  activeSkill: '',
                  liveSkill: '',
                })
              }
              variant="outlined"
              style={{ marginTop: 12 }}
            >
              リセット
            </Button>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  )
}

type PlateCardProps = {
  plate: Plate
  column: PlateSortColumn
  setPopupPlate: React.Dispatch<React.SetStateAction<Plate | null>>
}
const PlateCard: React.FC<PlateCardProps> = ({
  plate,
  column,
  setPopupPlate,
}) => {
  const classes = useStyles()
  const [release, setRelease] = React.useState(false)
  const changeRelease = () => {
    if (plate.image.length > 1) {
      setRelease(!release)
    }
  }

  return (
    <Paper className={classes.card}>
      <Typography color="textPrimary">{plate.name}</Typography>
      <div style={{ position: 'relative' }}>
        <img
          src={plate.image[release ? 1 : 0]}
          width={256}
          height={152}
          onClick={() => changeRelease()}
        />
        {column !== 'rality' && (
          <Typography
            style={{
              position: 'absolute',
              left: 10,
              bottom: 10,
              color: 'white',
              paddingLeft: 5,
              paddingRight: 5,
              background: 'rgba(100,100,100,0.5)',
            }}
          >
            {column}:{_.last(plate.status)?.[column]}
          </Typography>
        )}
      </div>
      <Button
        variant="outlined"
        style={{ width: '100%' }}
        onClick={() => setPopupPlate(plate)}
      >
        Detail
      </Button>
    </Paper>
  )
}

type PlatePageNationProps = {
  page: number
  changePage: (to: 'first' | 'prev' | 'next' | 'last') => void
  pages: number
  filteredCount: number
  allCount: number
}
const PlatePageNation: React.FC<PlatePageNationProps> = ({
  page,
  changePage,
  pages,
  filteredCount,
  allCount,
}) => {
  return (
    <Paper style={{ marginTop: 2 }}>
      <Grid container style={{ padding: 4 }}>
        <Grid item>
          <Button
            variant="outlined"
            disabled={page === 1}
            onClick={() => changePage('first')}
          >
            先頭へ
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            disabled={page <= 1}
            onClick={() => changePage('prev')}
          >
            前へ
          </Button>
        </Grid>
        <Grid item>
          <Typography style={{ paddingTop: 6, marginLeft: 4, marginRight: 4 }}>
            pages: {page} / {pages}
          </Typography>
        </Grid>
        <Grid>
          <Button
            variant="outlined"
            disabled={page >= pages}
            onClick={() => changePage('next')}
          >
            次へ
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            disabled={page === pages}
            onClick={() => changePage('last')}
          >
            末尾へ
          </Button>
        </Grid>
        <Grid item>
          <Typography style={{ paddingTop: 6, marginLeft: 4 }}>
            plates: {filteredCount} / {allCount}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  )
}
const plateSortColumns = [
  'rality',
  'total',
  'soul',
  'voice',
  'charm',
  'life',
  'suport',
  'foldWave',
  'luck',
]
type PlateSortColumn =
  | 'rality'
  | 'total'
  | 'soul'
  | 'voice'
  | 'charm'
  | 'life'
  | 'suport'
  | 'foldWave'
  | 'luck'
const plateSortDirections = ['asc', 'desc']
type PlateSortDirection = 'asc' | 'desc'
type PlateSortProps = {
  column: PlateSortColumn
  setColumn: React.Dispatch<React.SetStateAction<PlateSortColumn>>
  direction: PlateSortDirection
  setDirection: React.Dispatch<React.SetStateAction<PlateSortDirection>>
}
const PlateSort: React.FC<PlateSortProps> = ({
  column,
  setColumn,
  direction,
  setDirection,
}) => {
  const classes = useStyles()

  return (
    <Accordion style={{ marginTop: 4 }}>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography className={classes.heading}>ソート</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container>
          <Grid item>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="sortColumn">項目</InputLabel>
              <Select
                native
                value={column}
                onChange={e => setColumn(e.target.value as PlateSortColumn)}
                inputProps={{
                  name: 'sortColumn',
                  id: 'sortColumn',
                }}
              >
                {plateSortColumns.map((s, i) => (
                  <option key={'sortColumn_' + i} value={s}>
                    {s}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="sortDirection">方向</InputLabel>
              <Select
                native
                value={direction}
                onChange={e =>
                  setDirection(e.target.value as PlateSortDirection)
                }
                inputProps={{
                  name: 'sortDirection',
                  id: 'sortDirection',
                }}
              >
                {plateSortDirections.map((s, i) => (
                  <option key={'sortDirectio_' + i} value={s}>
                    {s}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  )
}

const StyledDialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(DialogContent)

const StyledDialogActions = withStyles((theme: Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(DialogActions)

type popupPlateProps = {
  popupPlate: Plate | null
  setPopupPlate: React.Dispatch<React.SetStateAction<Plate | null>>
}

const PopupPlate: React.FC<popupPlateProps> = ({
  popupPlate,
  setPopupPlate,
}) => {
  const [imageState, setImageState] = React.useState(false)
  const handleClose = () => {
    setPopupPlate(null)
  }

  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={popupPlate !== null}
      >
        {popupPlate && (
          <>
            <DialogTitle>
              <Typography align="center">{popupPlate.name}</Typography>
              <div style={{ textAlign: 'center' }}>
                <img
                  src={popupPlate.image[imageState ? 1 : 0]}
                  onClick={() => {
                    if (popupPlate.image.length === 1) return
                    setImageState(!imageState)
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
                        {popupPlate.status[0].total}
                      </TableCell>
                      <TableCell align="center">→</TableCell>
                      <TableCell align="right">
                        {popupPlate.status[1].total}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        ソウル
                      </TableCell>
                      <TableCell align="right">
                        {popupPlate.status[0].soul}
                      </TableCell>
                      <TableCell align="center">→</TableCell>
                      <TableCell align="right">
                        {popupPlate.status[1].soul}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        ボイス
                      </TableCell>
                      <TableCell align="right">
                        {popupPlate.status[0].voice}
                      </TableCell>
                      <TableCell align="center">→</TableCell>
                      <TableCell align="right">
                        {popupPlate.status[1].voice}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        チャーム
                      </TableCell>
                      <TableCell align="right">
                        {popupPlate.status[0].charm}
                      </TableCell>
                      <TableCell align="center">→</TableCell>
                      <TableCell align="right">
                        {popupPlate.status[1].charm}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <Typography variant="subtitle2">センタースキル</Typography>
              {popupPlate.centerSkill[0]?.[1] && (
                <TableContainer component={Paper}>
                  <Table size="small" aria-label="a dense table">
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          {popupPlate.centerSkill[0][1].name}{' '}
                          {popupPlate.centerSkill[0][1].rank}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          {popupPlate.centerSkill[0][1].effect}
                          {popupPlate.centerSkill[0][1].conditions && (
                            <>
                              <br />
                              <span style={{ color: 'red' }}>
                                {popupPlate.centerSkill[0][1].conditions}
                              </span>
                            </>
                          )}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
              {popupPlate.centerSkill[1]?.[1] && (
                <TableContainer component={Paper}>
                  <Table size="small" aria-label="a dense table">
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          {popupPlate.centerSkill[1][1].name}{' '}
                          {popupPlate.centerSkill[1][1].rank}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          {popupPlate.centerSkill[1][1].effect}
                          {popupPlate.centerSkill[1][1].conditions && (
                            <>
                              <br />
                              <span style={{ color: 'red' }}>
                                {popupPlate.centerSkill[0][1].conditions}
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
              {popupPlate.activeSkill[0]?.[1] && (
                <TableContainer component={Paper}>
                  <Table size="small" aria-label="a dense table">
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          {popupPlate.activeSkill[0][1].name}{' '}
                          {popupPlate.activeSkill[0][1].rank}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          {popupPlate.activeSkill[0][1].effect}
                          {popupPlate.activeSkill[0][1].conditions && (
                            <>
                              <br />
                              <span style={{ color: 'red' }}>
                                {popupPlate.activeSkill[0][1].conditions}
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
              {popupPlate.liveSkill[0]?.[1] && (
                <TableContainer component={Paper}>
                  <Table size="small" aria-label="a dense table">
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          {popupPlate.liveSkill[0][1].name}{' '}
                          {popupPlate.liveSkill[0][1].rank}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          {popupPlate.liveSkill[0][1].effect}
                          {popupPlate.liveSkill[0][1].conditions && (
                            <>
                              <br />
                              <span style={{ color: 'red' }}>
                                {popupPlate.liveSkill[0][1].conditions}
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
  )
}
const PlateListPage: React.FC = () => {
  const classes = useStyles()
  const plates = platesJson.data
  const [selectedAttributes, setSelectedAttributes] = React.useState<string[]>(
    [],
  )
  const [selectedSkill, setSelectedSkill] = React.useState<SkillFilterState>({
    centerSkill: '',
    activeSkill: '',
    liveSkill: '',
  })
  const [selectedDivas, setSelectedDivas] = React.useState<string[]>([])
  const [page, setPage] = React.useState(1)
  const [sortColumn, setSortColumn] = React.useState<PlateSortColumn>('rality')
  const [sortDirection, setSortDirection] = React.useState<PlateSortDirection>(
    'desc',
  )
  const [popupPlate, setPopupPlate] = React.useState<Plate | null>(null)
  const changePage = (to: 'first' | 'prev' | 'next' | 'last' | number) => {
    switch (to) {
      case 'first':
        setPage(1)
        break
      case 'prev':
        setPage(p => p - 1)
        break
      case 'next':
        setPage(p => p + 1)
        break
      case 'last':
        setPage(pages)
        break
      case typeof Number:
        setPage(to)
        break
    }
  }
  const numberOfPage = 24
  const filteredPlateList = _.filter(
    plates,
    f =>
      (selectedAttributes.length === 0 ||
        _.indexOf(selectedAttributes, f.attribute) >= 0) &&
      (selectedSkill.centerSkill === '' ||
        (f.centerSkill.length > 0 &&
          f.centerSkill[0][0].name === selectedSkill.centerSkill)) &&
      (selectedSkill.activeSkill === '' ||
        (f.activeSkill.length > 0 &&
          f.activeSkill[0][0]?.name === selectedSkill.activeSkill)) &&
      (selectedSkill.liveSkill === '' ||
        (f.liveSkill.length > 0 &&
          f.liveSkill[0][0]?.name === selectedSkill.liveSkill)) &&
      (selectedDivas.length === 0 ||
        _.intersection(f.compatibleDiva, selectedDivas).length ===
          selectedDivas.length),
  )

  const sortedPlateList = _.orderBy(
    filteredPlateList,
    o => {
      if (sortColumn === 'rality') return o.rality
      return _.last(o.status)?.[sortColumn]
    },
    sortDirection,
  )
  let pages = Math.ceil(sortedPlateList.length / numberOfPage)
  if (pages === 0) pages = 1
  if (page > pages) setPage(pages)
  const pagedPlateList = sortedPlateList.slice(
    (page - 1) * numberOfPage,
    page * numberOfPage,
  )

  return (
    <Container maxWidth="xl" className={classes.root}>
      <Accordion style={{ marginTop: 4 }}>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>フィルター</Typography>
        </AccordionSummary>
        <AccordionDetails style={{ padding: 0 }}>
          <Grid container>
            <Grid item xs={12}>
              <AttributeFilter
                selectedAttributes={selectedAttributes}
                setSelectedAttributes={setSelectedAttributes}
              />
            </Grid>
            <Grid item xs={12}>
              <SkillFilter
                selectedSkill={selectedSkill}
                setSelectedSkill={setSelectedSkill}
              />
            </Grid>
            <Grid item xs={12}>
              <DivaFilter
                selectedDivas={selectedDivas}
                setSelectedDivas={setSelectedDivas}
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      <PlateSort
        column={sortColumn}
        setColumn={setSortColumn}
        direction={sortDirection}
        setDirection={setSortDirection}
      />
      <PlatePageNation
        page={page}
        changePage={changePage}
        pages={pages}
        filteredCount={filteredPlateList.length}
        allCount={plates.length}
      />

      <Grid container className={classes.grid}>
        {pagedPlateList.map(p => (
          <Grid item xs={12} key={p.id} style={{ width: 300 }}>
            <PlateCard
              plate={p}
              column={sortColumn}
              setPopupPlate={setPopupPlate}
            />
          </Grid>
        ))}
      </Grid>
      <PlatePageNation
        page={page}
        changePage={changePage}
        pages={pages}
        filteredCount={filteredPlateList.length}
        allCount={plates.length}
      />
      <PopupPlate popupPlate={popupPlate} setPopupPlate={setPopupPlate} />
    </Container>
  )
}

export default PlateListPage
