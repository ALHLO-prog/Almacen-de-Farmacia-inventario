import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import useUser from '../context/useUser'

function Nav() {
  const { user } = useUser()

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          {user.isRegistered ? (
            <Button color='inherit' startIcon={<AccountCircleIcon />}>
              {user.name}
            </Button>
          ) : (
            <h2>Inventario de Farmacia HLO</h2>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Nav
