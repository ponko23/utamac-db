import React, { FC } from 'react'
import { makeStyles } from '@material-ui/styles'
import {
  Container,
  Theme,
  Grid,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
} from '@material-ui/core'

import costumesJson from '../data/costumes.json'
import divasJson from '../data/divas.json'
import DivaFilter from '../components/divaFilter'
import _ from 'lodash'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}))
const divaIcons: DivaIcon[] = []
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

const CostumeListPage: FC = () => {
  const classes = useStyles()
  const divas = divasJson.data
  const costumes = costumesJson.data
  const [selectedDivas, setSelectedDivas] = React.useState<string[]>([])

  const filteredCostumes = _.filter(
    costumes,
    f => selectedDivas.length === 0 || _.indexOf(selectedDivas, f.diva) >= 0,
  )
  return (
    <Container maxWidth="xl" className={classes.root}>
      <DivaFilter
        selectedDivas={selectedDivas}
        setSelectedDivas={setSelectedDivas}
      />
      <Grid container>
        {filteredCostumes.map(c => {
          return (
            <Grid item key={c.id}>
              <Card style={{ margin: 5, width: 266 }}>
                <CardHeader
                  avatar={
                    <img
                      src={divas.find(d => d.name === c.diva)?.icon}
                      width={40}
                    />
                  }
                  title={c.name}
                />
                <CardMedia
                  image={c.image}
                  style={{ height: 256, width: 256 }}
                />
                <CardContent>{c.effect}</CardContent>
              </Card>
            </Grid>
          )
        })}
      </Grid>
    </Container>
  )
}

export default CostumeListPage
