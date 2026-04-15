import { useEffect } from 'react'
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material'
import { Inventory, AssignmentTurnedIn, Assignment } from '@mui/icons-material'
import { Link, useLocation } from 'react-router-dom'
import useNavigationStore from '../context/UseNavigationStore'

function BotNav() {
  const { activeTab, setActiveTab } = useNavigationStore()
  const location = useLocation()
  useEffect(() => {
    const path = location.pathname
    if (path === '/inventario') setActiveTab(0)
    if (path === '/usuarios') setActiveTab(1)
    if (path === '/solicitudes') setActiveTab(2)
  }, [location, setActiveTab])

  return (
    <Paper
      sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={activeTab}
        onChange={(event, newValue) => {
          setActiveTab(newValue)
        }}
      >
        <BottomNavigationAction
          label='Inventario'
          icon={<Inventory />}
          component={Link}
          to='/inventario'
        />
        <BottomNavigationAction
          label='Pedidos'
          icon={<AssignmentTurnedIn />}
          component={Link}
          to='/pedidos'
        />
        <BottomNavigationAction
          label='Registros'
          icon={<Assignment />}
          component={Link}
          to='/registros'
        />
      </BottomNavigation>
    </Paper>
  )
}

export default BotNav
