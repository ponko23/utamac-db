import React, { FC } from 'react'

import { makeStyles } from '@material-ui/styles'
import {
  Container,
  Typography,
  Theme,
  Link,
  BottomNavigation,
  BottomNavigationAction,
} from '@material-ui/core'
import { ListAltOutlined } from '@material-ui/icons'

const useStyles = makeStyles((theme: Theme) => ({
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor: theme.palette.background.paper,
  },
}))
const menuLinks = [{ name: 'Plate', link: '/plateList/' }]
const Footer: FC = () => {
  const classes = useStyles()
  return (
    <footer className={classes.footer}>
      <Container maxWidth="md">
        <div
          style={{
            margin: '0 auto',
            maxWidth: 960,
            padding: '1.45rem 1.0875rem',
            display: 'flex',
            justifyItems: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            <nav>
              <ul style={{ display: 'flex', flex: 1 }}>
                {menuLinks.map(link => (
                  <li
                    key={link.name}
                    style={{
                      listStyleType: `none`,
                      padding: `1rem`,
                    }}
                  >
                    <Link
                      style={{ color: `black` }}
                      href={link.link}
                      variant="body2"
                      color="textPrimary"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
