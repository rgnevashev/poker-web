/** @format */

import { createMuiTheme } from '@material-ui/core/styles'

import teal from '@material-ui/core/colors/teal'
import red from '@material-ui/core/colors/red'

export default () => {
  const theme = createMuiTheme({
    typography: {
      useNextVariants: true
    },
    palette: {
      type: 'light',
      primary: {
        light: teal[300],
        main: '#2cbda5',
        dark: teal[700],
        contrastText: '#fff'
      },
      error: red
    },
    shape: {
      borderRadius: 8
    },
    overrides: {
      MuiButton: {
        raisedPrimary: {
          color: 'white'
        }
      },
      MuiDrawer: {
        paper: {
          minWidth: 250
        },
        paperAnchorDockedLeft: {
          borderRight: 'none'
        }
      }
    }
  })

  return theme
}
