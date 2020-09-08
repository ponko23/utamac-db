import React, { FC } from 'react'
import { makeStyles, ThemeProvider } from '@material-ui/styles'
import {
  Theme,
  BottomNavigation,
  BottomNavigationAction,
  Hidden,
} from '@material-ui/core'
import { ListOutlined } from '@material-ui/icons'
import { useSelector } from 'react-redux'

import Header from './header'
import Footer from './footer'
import themes from '../theme'
import useSiteMetadata from '../hooks/useSiteMetadata'
import { RootState } from '../redux/store'
import { navigateTo } from 'gatsby'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: theme.palette.background.default,
  },
  main: {
    backgroundColor: theme.palette.background.default,
    marginBottom: 56,
  },
}))

const LayoutComponent: FC = ({ children }) => {
  const classes = useStyles()
  const { title } = useSiteMetadata()
  const [value, setValue] = React.useState(0)

  return (
    <div className={classes.root}>
      <Header siteTitle={title} />
      <main className={classes.main}>{children}</main>

      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue)
          navigateTo(newValue)
        }}
        showLabels
        style={{
          height: 56,
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        <BottomNavigationAction
          label="Plate"
          icon={<ListOutlined />}
          value="./plateList"
        />
        <BottomNavigationAction
          label="Costume"
          value="./costumeList"
          icon={<ListOutlined />}
        />
        <BottomNavigationAction label="Live" icon={<ListOutlined />} />
      </BottomNavigation>
    </div>
  )
}

const Layout: FC = ({ children }) => {
  const { theme } = useSelector((state: RootState) => state.app)

  return (
    <ThemeProvider theme={themes[theme]}>
      <LayoutComponent>{children}</LayoutComponent>
    </ThemeProvider>
  )
}

export default Layout
