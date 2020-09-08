import React, { FC } from 'react'
import { Link as GatsbyLink } from 'gatsby'
import { Grid, Button, Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

import SEO from '../components/seo'
import Hero from '../components/hero'

const useStyles = makeStyles((theme: Theme) => ({
  heroButtons: {
    marginTop: theme.spacing(4),
  },
}))

const IndexPage: FC = () => {
  const classes = useStyles()
  return (
    <>
      <div className={classes.heroButtons}>
        <Grid container spacing={2} justify="center">
          <Grid item>
            <Button
              component={GatsbyLink}
              to="/plateList/"
              variant="contained"
              color="primary"
            >
              Plate List
            </Button>
            <Button
              component={GatsbyLink}
              to="/costumeList/"
              variant="contained"
              color="primary"
            >
              Costume List
            </Button>
          </Grid>
        </Grid>
      </div>
    </>
  )
}

export default IndexPage
