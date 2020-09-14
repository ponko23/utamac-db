import React, { FC } from 'react'
import { makeStyles } from '@material-ui/styles'
import divasJson from '../data/divas.json'
import {
  Theme,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Grid,
  Hidden,
} from '@material-ui/core'
import { ExpandMore } from '@material-ui/icons'
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab'
const useStyles = makeStyles((theme: Theme) => ({
  heading: {
    fontSize: theme.typography.pxToRem(12),
    fontWeight: theme.typography.fontWeightRegular,
  },
}))

let divaIcons: DivaIcon[] = []
divasJson.data.forEach(d =>
  divaIcons.push({
    id: d.id,
    name: d.name,
    icon: d.icon,
  }),
)
type DivaIcon = {
  id: string
  icon: string
  name: string
}

type DivaFilterProps = {
  selectedDivas: string[]
  setSelectedDivas: React.Dispatch<React.SetStateAction<string[]>>
}

const DivaFilter: FC<DivaFilterProps> = ({
  selectedDivas,
  setSelectedDivas,
}) => {
  const [all, setAll] = React.useState(true)
  const classes = useStyles()

  const changeSelectedDivas = (
    event: React.MouseEvent<HTMLElement>,
    newDivas: string[],
  ) => {
    setSelectedDivas(newDivas)
    if (newDivas.length === 0) {
      setAll(false)
    } else if (newDivas.length === divaIcons.length) {
      setAll(true)
    }
  }

  const changeAll = () => {
    if (all) {
      setSelectedDivas([])
      setAll(false)
    } else {
      setSelectedDivas(divaIcons.map(d => d.name))
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
        <Typography className={classes.heading}>歌姫</Typography>
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
              value={selectedDivas}
              onChange={changeSelectedDivas}
            >
              {divaIcons.slice(0, 5).map(d => (
                <ToggleButton size="small" key={d.id} value={d.name}>
                  <img src={d.icon} width={36} />
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Grid>
          <Hidden smUp>
            <Grid item>
              <div style={{ width: 52, height: 52 }} />
            </Grid>
          </Hidden>
          <Grid item>
            <ToggleButtonGroup
              value={selectedDivas}
              onChange={changeSelectedDivas}
            >
              {divaIcons.slice(5, 10).map(d => (
                <ToggleButton size="small" key={d.id} value={d.name}>
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

export default DivaFilter
